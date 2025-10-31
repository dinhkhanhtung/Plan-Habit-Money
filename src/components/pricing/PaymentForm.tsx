'use client';

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSession } from 'next-auth/react';

interface Package {
  id: string;
  name: string;
  price: number;
  days: number;
  features: string[];
  popular: boolean;
}

interface PaymentFormProps {
  selectedPackage: Package;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentForm({ selectedPackage, onClose, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !session) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedPackage.price,
          days: selectedPackage.days,
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: session.user?.email || '',
          },
        },
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else {
        onSuccess();
      }
    } catch (error) {
      onError('An unexpected error occurred');
    }

    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-background-dark p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Thanh toán</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
            <h4 className="font-semibold">{selectedPackage.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedPackage.days} ngày - {selectedPackage.price.toLocaleString('vi-VN')}đ
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Thông tin thẻ</label>
            <div className="rounded-lg border border-gray-300 bg-white p-3 dark:border-gray-600 dark:bg-gray-800">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 px-4 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="flex-1 rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
            >
              {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}