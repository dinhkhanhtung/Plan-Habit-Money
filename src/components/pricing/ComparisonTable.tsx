import React from 'react';

interface Feature {
  name: string;
  day: boolean | string;
  year: boolean | string;
}

const features: Feature[] = [
  {
    name: 'Lập kế hoạch tuần không giới hạn',
    day: true,
    year: true,
  },
  {
    name: 'Theo dõi thói quen',
    day: true,
    year: true,
  },
  {
    name: 'Phân tích chi tiêu thông minh',
    day: true,
    year: true,
  },
  {
    name: 'Đồng bộ hóa đa thiết bị',
    day: true,
    year: true,
  },
  {
    name: 'Báo cáo & Phân tích nâng cao',
    day: false,
    year: true,
  },
  {
    name: 'Hỗ trợ ưu tiên',
    day: false,
    year: true,
  },
];

export default function ComparisonTable() {
  return (
    <>
      {/* Section Header */}
      <section className="mb-6 text-center md:mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-[#333333] dark:text-white md:text-3xl">
          So sánh các tính năng
        </h2>
      </section>

      {/* Table */}
      <section className="mb-12 md:mb-20">
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left font-medium text-gray-600 dark:text-gray-300">
                  Tính năng
                </th>
                <th className="w-36 px-6 py-4 text-center font-medium text-gray-600 dark:text-gray-300">
                  Gói Ngày
                </th>
                <th className="w-36 px-6 py-4 text-center font-medium text-gray-600 dark:text-gray-300">
                  Gói Năm
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {features.map((feature, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-[#333333] dark:text-gray-300">
                    {feature.name}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof feature.day === 'boolean' ? (
                      feature.day ? (
                        <span className="material-symbols-outlined text-xl text-primary">
                          check
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-xl text-gray-400 dark:text-gray-600">
                          horizontal_rule
                        </span>
                      )
                    ) : (
                      feature.day
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof feature.year === 'boolean' ? (
                      feature.year ? (
                        <span className="material-symbols-outlined text-xl text-primary">
                          check
                        </span>
                      ) : (
                        <span className="material-symbols-outlined text-xl text-gray-400 dark:text-gray-600">
                          horizontal_rule
                        </span>
                      )
                    ) : (
                      feature.year
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}