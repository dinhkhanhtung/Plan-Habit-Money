"use client";

import { ContactInfo as ContactInfoType } from "@/types/support";

interface ContactInfoProps {
  contact: ContactInfoType;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  return (
    <div className="mt-12 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-sm text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        Need more help?
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Can't find the answer you're looking for? We're here to help.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg h-12 px-6 text-base font-medium bg-primary text-white hover:bg-primary/90">
          <span className="material-symbols-outlined">email</span>
          Send Support Email
        </button>
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg h-12 px-6 text-base font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700">
          <span className="material-symbols-outlined">chat_bubble</span>
          Chat with Us
        </button>
      </div>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Expected response time: {contact.responseTime}
      </p>
    </div>
  );
}