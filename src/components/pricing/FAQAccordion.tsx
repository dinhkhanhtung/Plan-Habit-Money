import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
  open?: boolean;
}

const faqs: FAQItem[] = [
  {
    question: 'Tôi có thể hủy đăng ký bất cứ lúc nào không?',
    answer:
      'Có, bạn có thể hủy đăng ký của mình bất cứ lúc nào từ trang cài đặt tài khoản. Bạn sẽ tiếp tục có quyền truy cập vào các tính năng trả phí cho đến hết chu kỳ thanh toán hiện tại.',
    open: true,
  },
  {
    question: 'Các hình thức thanh toán được chấp nhận là gì?',
    answer:
      'Chúng tôi chấp nhận tất cả các loại thẻ tín dụng và thẻ ghi nợ chính (Visa, MasterCard, American Express), cũng như thanh toán qua ví điện tử như MoMo và ZaloPay.',
  },
  {
    question: 'Dữ liệu của tôi có được an toàn không?',
    answer:
      'Bảo mật dữ liệu của bạn là ưu tiên hàng đầu của chúng tôi. Chúng tôi sử dụng mã hóa tiêu chuẩn ngành để bảo vệ dữ liệu của bạn và không bao giờ chia sẻ thông tin cá nhân của bạn với bên thứ ba.',
  },
];

export default function FAQAccordion() {
  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#333333] dark:text-white md:text-3xl">
          Câu hỏi thường gặp
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-lg bg-white p-6 dark:bg-background-dark/50"
            open={faq.open}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#333333] dark:text-white">
              {faq.question}
              <span className="transition group-open:rotate-180">
                <span className="material-symbols-outlined">expand_more</span>
              </span>
            </summary>
            <p className="group-open:animate-fadeIn mt-3 text-gray-600 dark:text-gray-400">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}