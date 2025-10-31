import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

// Validation schema for payment intent creation
const createPaymentIntentSchema = z.object({
  amount: z.number().positive().max(10000000), // Max 10M VND
  days: z.number().int().positive().max(365), // Max 1 year
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate input
    const validationResult = createPaymentIntentSchema.safeParse(body);
    if (!validationResult.success) {
      console.log('Payment intent validation failed:', validationResult.error);
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    const { amount, days } = validationResult.data;

    // Find user by email to get the ID
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate amount conversion (prevent division by zero or invalid values)
    if (amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Convert VND to cents for Stripe (assuming 1 USD = 23,000 VND approximately)
    const amountInCents = Math.round(amount / 230);

    // Additional validation: ensure amount is reasonable
    if (amountInCents < 50 || amountInCents > 999999) { // Stripe minimum 50 cents, reasonable maximum
      return NextResponse.json({ error: 'Amount out of acceptable range' }, { status: 400 });
    }

    // Create payment intent with enhanced security
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd', // Stripe requires USD for international payments
      metadata: {
        userId: user.id,
        userEmail: session.user.email,
        days: days.toString(),
        originalAmountVND: amount.toString(),
      },
      // PCI compliance: Use automatic payment methods
      automatic_payment_methods: {
        enabled: true,
      },
      // Additional security: set application_fee_amount if using connected accounts
      application_fee_amount: undefined, // Not using connected accounts
    });

    // Log transaction creation for monitoring
    console.log(`Creating payment intent for user ${user.id}: amount=${amountInCents} cents, days=${days}`);

    // Create transaction record with enhanced logging
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: amountInCents,
        currency: 'usd',
        status: 'pending',
        stripePaymentIntentId: paymentIntent.id,
        daysPurchased: days,
      },
    });

    console.log(`Transaction created: ${transaction.id} for payment intent ${paymentIntent.id}`);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}