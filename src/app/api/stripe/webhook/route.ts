import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    console.error('No Stripe signature found');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature using Stripe's constructEvent method with additional validation
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Additional security: verify the event timestamp is recent (within last 5 minutes)
    const eventTimestamp = event.created;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const timeDifference = currentTimestamp - eventTimestamp;

    if (timeDifference > 300) { // 5 minutes
      console.error('Webhook event is too old');
      return NextResponse.json({ error: 'Event too old' }, { status: 400 });
    }
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Find the transaction
      const transaction = await prisma.transaction.findUnique({
        where: { stripePaymentIntentId: paymentIntent.id },
        include: { user: true },
      });

      if (!transaction) {
        console.error('Transaction not found for payment intent:', paymentIntent.id);
        return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
      }

      // Log successful payment
      console.log(`Payment succeeded for transaction ${transaction.id}, user ${transaction.userId}`);

      // Update transaction status
      await prisma.transaction.update({
        where: { stripePaymentIntentId: paymentIntent.id },
        data: {
          status: 'succeeded',
          completedAt: new Date(),
        },
      });

      // Add days to user's account with validation
      const currentDays = transaction.user.usageDaysRemaining || 0;
      const daysToAdd = transaction.daysPurchased;

      if (daysToAdd <= 0 || daysToAdd > 365) {
        console.error(`Invalid days purchased: ${daysToAdd}`);
        return NextResponse.json({ error: 'Invalid transaction data' }, { status: 400 });
      }

      const newDays = currentDays + daysToAdd;

      // Calculate expiration date (add days to current date or extend existing)
      const now = new Date();
      const currentExpiry = transaction.user.subscriptionExpiresAt;
      const expiryDate = currentExpiry && currentExpiry > now
        ? new Date(currentExpiry.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
        : new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

      await prisma.user.update({
        where: { id: transaction.userId },
        data: {
          usageDaysRemaining: newDays,
          subscriptionExpiresAt: expiryDate,
          subscriptionStatus: 'premium',
        },
      });

      console.log(`Successfully added ${daysToAdd} days to user ${transaction.userId}, new total: ${newDays} days`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}