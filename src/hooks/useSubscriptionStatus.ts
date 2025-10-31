'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface SubscriptionStatus {
  isExpiringSoon: boolean;
  daysRemaining: number;
  subscriptionStatus: string | null;
  showNotification: boolean;
}

export function useSubscriptionStatus(): SubscriptionStatus {
  const { data: session } = useSession();
  const [status, setStatus] = useState<SubscriptionStatus>({
    isExpiringSoon: false,
    daysRemaining: 0,
    subscriptionStatus: null,
    showNotification: false,
  });

  useEffect(() => {
    if (!session?.user?.email) return;

    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/subscription/status');
        if (response.ok) {
          const data = await response.json();

          const daysRemaining = data.daysRemaining || 0;
          const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 7;
          const showNotification = isExpiringSoon;

          setStatus({
            isExpiringSoon,
            daysRemaining,
            subscriptionStatus: data.subscriptionStatus,
            showNotification,
          });
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkSubscription();

    // Check every hour for updates
    const interval = setInterval(checkSubscription, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [session?.user?.email]);

  return status;
}