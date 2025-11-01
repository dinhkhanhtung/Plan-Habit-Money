// Google Analytics helper functions

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_TRACKING_ID) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom event tracking functions
export const trackUserRegistration = (method: 'email' | 'google') => {
  event({
    action: 'sign_up',
    category: 'engagement',
    label: method,
  });
};

export const trackUserLogin = (method: 'email' | 'google') => {
  event({
    action: 'login',
    category: 'engagement',
    label: method,
  });
};

export const trackTaskCreated = () => {
  event({
    action: 'task_created',
    category: 'weekly_planner',
  });
};

export const trackTaskCompleted = () => {
  event({
    action: 'task_completed',
    category: 'weekly_planner',
  });
};

export const trackGoalCreated = () => {
  event({
    action: 'goal_created',
    category: 'weekly_planner',
  });
};

export const trackHabitCreated = () => {
  event({
    action: 'habit_created',
    category: 'habit_tracker',
  });
};

export const trackHabitLogged = () => {
  event({
    action: 'habit_logged',
    category: 'habit_tracker',
  });
};

export const trackBudgetCreated = () => {
  event({
    action: 'budget_created',
    category: 'smart_money',
  });
};

export const trackTransactionCreated = (type: 'income' | 'expense') => {
  event({
    action: 'transaction_created',
    category: 'smart_money',
    label: type,
  });
};

export const trackSubscriptionPurchase = (plan: string, amount: number) => {
  event({
    action: 'purchase',
    category: 'ecommerce',
    label: plan,
    value: amount,
  });
};

export const trackFeatureUsage = (feature: string) => {
  event({
    action: 'feature_used',
    category: 'engagement',
    label: feature,
  });
};

export const trackError = (errorMessage: string) => {
  event({
    action: 'error',
    category: 'errors',
    label: errorMessage,
  });
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

