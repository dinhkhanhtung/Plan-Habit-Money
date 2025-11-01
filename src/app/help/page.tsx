'use client';

import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Tài khoản',
    question: 'Làm sao để đặt lại mật khẩu?',
    answer: 'Vào trang Login, nhấn "Quên mật khẩu?", nhập email đã đăng ký, kiểm tra email và nhấn vào link đặt lại mật khẩu. Link có hiệu lực trong 1 giờ.',
  },
  {
    category: 'Tài khoản',
    question: 'Tôi không nhận được email xác thực?',
    answer: 'Kiểm tra thư mục Spam/Junk, đợi 5-10 phút, hoặc yêu cầu gửi lại email từ Settings → Account → Resend Verification Email.',
  },
  {
    category: 'Subscription',
    question: 'Giá cả như thế nào?',
    answer: '10,000 VND/ngày. Mua theo gói: 7 ngày (70,000 VND), 30 ngày (300,000 VND), hoặc tự chọn số ngày.',
  },
  {
    category: 'Subscription',
    question: 'Tôi có thể hoàn tiền không?',
    answer: 'Hoàn tiền 100% trong vòng 7 ngày nếu chưa sử dụng. Liên hệ support@planhabitmoney.com với thông tin giao dịch.',
  },
  {
    category: 'Weekly Planner',
    question: 'Làm sao để tạo task mới?',
    answer: 'Vào trang Weekly Planner, nhấn "Add New Task", điền tiêu đề, mô tả, ngày, giờ, rồi nhấn "Lưu".',
  },
  {
    category: 'Habit Tracker',
    question: 'Streak là gì?',
    answer: 'Streak là số ngày liên tiếp hoàn thành thói quen. VD: Tập thể dục 7 ngày liên tục = Streak 7. Icon lửa 🔥 xuất hiện khi streak ≥ 3 ngày.',
  },
  {
    category: 'Smart Money',
    question: 'Làm sao để tạo budget?',
    answer: 'Vào trang Smart Money, nhấn "Add Budget", điền tên ngân sách, danh mục, số tiền, chu kỳ, rồi nhấn "Tạo".',
  },
  {
    category: 'Bảo mật',
    question: 'Dữ liệu của tôi có an toàn không?',
    answer: 'Có! Mã hóa SSL/TLS, mật khẩu được hash với bcrypt, database được bảo vệ và backup định kỳ, không chia sẻ dữ liệu với bên thứ 3, tuân thủ GDPR.',
  },
];

const categories = ['Tất cả', 'Tài khoản', 'Subscription', 'Weekly Planner', 'Habit Tracker', 'Smart Money', 'Bảo mật'];

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'Tất cả' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ProtectedRoute>
      <AppLayout title="Trợ giúp">
        <div className="px-4 md:px-10 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Trung tâm Trợ giúp
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Tìm câu trả lời cho các câu hỏi thường gặp
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4 mb-12">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-white/10 p-6 group"
                >
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))
            ) : (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
                  search_off
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  Không tìm thấy câu hỏi phù hợp
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    description
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Hướng dẫn sử dụng
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tài liệu chi tiết về cách sử dụng từng tính năng
              </p>
              <a
                href="/USER_GUIDE.md"
                target="_blank"
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
              >
                Xem hướng dẫn
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">
                    help
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  FAQ đầy đủ
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                40+ câu hỏi thường gặp với câu trả lời chi tiết
              </p>
              <a
                href="/FAQ.md"
                target="_blank"
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
              >
                Xem FAQ
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                    mail
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Liên hệ Support
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Gửi email cho chúng tôi, phản hồi trong 24-48 giờ
              </p>
              <a
                href="mailto:support@planhabitmoney.com"
                className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
              >
                Gửi email
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Vẫn cần trợ giúp?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Đội ngũ support của chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@planhabitmoney.com"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">mail</span>
                Gửi Email
              </a>
              <a
                href="/USER_GUIDE.md"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-6 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
              >
                <span className="material-symbols-outlined">description</span>
                Xem Hướng dẫn
              </a>
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

