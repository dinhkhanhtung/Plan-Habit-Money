export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  email: string;
  chat: string;
  responseTime: string;
}

export interface SupportCategory {
  id: string;
  name: string;
  count: number;
}