import { FAQItem, SupportCategory, ContactInfo } from "@/types/support";

export const faqData: FAQItem[] = [
  // Getting Started
  {
    id: "1",
    category: "getting-started",
    question: "How do I create an account?",
    answer: "To create an account, click the 'Sign Up' button on the homepage and follow the instructions. You can register using your email address or social media accounts."
  },
  {
    id: "2",
    category: "getting-started",
    question: "What devices can I use the Planner app on?",
    answer: "The Planner app works on all modern web browsers including Chrome, Firefox, Safari, and Edge. You can access it from desktops, laptops, tablets, and mobile devices."
  },
  {
    id: "3",
    category: "getting-started",
    question: "Is the Planner app free to use?",
    answer: "We offer a free tier with basic features. Premium features are available through our subscription plans starting at just 1,000 VND per day."
  },

  // Subscription Management
  {
    id: "4",
    category: "subscription",
    question: "How does the '1k/day' subscription work?",
    answer: "Our '1k/day' plan is a flexible daily subscription where you pay 1,000 VND per day for full access to all premium features. Billing occurs automatically and you can cancel anytime."
  },
  {
    id: "5",
    category: "subscription",
    question: "How do I upgrade or change my subscription?",
    answer: "You can manage your subscription in the Settings > Billing section. From there, you can upgrade, downgrade, or cancel your current plan."
  },
  {
    id: "6",
    category: "subscription",
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your current billing period."
  },
  {
    id: "7",
    category: "subscription",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and popular digital payment methods including PayPal, Stripe, and local payment options."
  },

  // Features
  {
    id: "8",
    category: "features",
    question: "How do I add a new habit to track?",
    answer: "Navigate to the Habits section from the main menu, then click the '+' button or 'Add New Habit'. Choose a name, icon, frequency, and any reminders you'd like to set."
  },
  {
    id: "9",
    category: "features",
    question: "Can I create recurring tasks in the weekly planner?",
    answer: "Yes! When creating a task in the weekly planner, you can set it to repeat daily, weekly, monthly, or on specific days of the week."
  },
  {
    id: "10",
    category: "features",
    question: "How do I set up my budget in Smart Money?",
    answer: "Go to the Smart Money section and click 'Set Budget'. You can create categories, set spending limits, and track your expenses across different time periods."
  },
  {
    id: "11",
    category: "features",
    question: "Can I export my data?",
    answer: "Yes, you can export your planner data, habit tracking history, and financial records in various formats including PDF, CSV, and Excel from the Settings > Export Data section."
  },

  // Technical & Troubleshooting
  {
    id: "12",
    category: "technical",
    question: "Why isn't my data syncing across devices?",
    answer: "Ensure you have a stable internet connection and are signed into the same account. Try refreshing the page or clearing your browser cache. If issues persist, contact support."
  },
  {
    id: "13",
    category: "technical",
    question: "How do I reset my password?",
    answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to create a new password."
  },
  {
    id: "14",
    category: "technical",
    question: "The app is running slowly. What can I do?",
    answer: "Try clearing your browser cache and cookies, close other browser tabs, or try accessing the app from a different browser. Premium users get priority server access."
  },
  {
    id: "15",
    category: "technical",
    question: "How do I clear my data and start over?",
    answer: "You can reset your account data in Settings > Account > Reset Data. This action cannot be undone, so make sure to export any important data first."
  },

  // Account & Security
  {
    id: "16",
    category: "security",
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard encryption and security measures. Your data is stored securely and we never share personal information with third parties."
  },
  {
    id: "17",
    category: "security",
    question: "How do I change my email address?",
    answer: "Go to Settings > Account > Profile, and click 'Change Email'. You'll need to verify your new email address before the change takes effect."
  },
  {
    id: "18",
    category: "security",
    question: "Can I delete my account?",
    answer: "Yes, you can delete your account in Settings > Account > Delete Account. This will permanently remove all your data. Consider exporting your data first if needed."
  },
  {
    id: "19",
    category: "security",
    question: "What happens when my trial expires?",
    answer: "When your trial expires, you'll be prompted to choose a subscription plan. Your data remains safe, but you'll need a paid plan to access premium features."
  }
];

export const categories: SupportCategory[] = [
  {
    id: "all",
    name: "All",
    count: faqData.length
  },
  {
    id: "getting-started",
    name: "Getting Started",
    count: faqData.filter(faq => faq.category === "getting-started").length
  },
  {
    id: "subscription",
    name: "Subscription Management",
    count: faqData.filter(faq => faq.category === "subscription").length
  },
  {
    id: "features",
    name: "Features",
    count: faqData.filter(faq => faq.category === "features").length
  },
  {
    id: "technical",
    name: "Technical & Troubleshooting",
    count: faqData.filter(faq => faq.category === "technical").length
  },
  {
    id: "security",
    name: "Account & Security",
    count: faqData.filter(faq => faq.category === "security").length
  }
];

export const contactInfo: ContactInfo = {
  email: "support@plannerapp.com",
  chat: "Available 24/7",
  responseTime: "24 hours"
};