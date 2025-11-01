// User-friendly error messages mapping

export const ERROR_MESSAGES = {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.',
  AUTH_EMAIL_EXISTS: 'Email này đã được sử dụng. Vui lòng đăng nhập hoặc sử dụng email khác.',
  AUTH_WEAK_PASSWORD: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.',
  AUTH_INVALID_EMAIL: 'Địa chỉ email không hợp lệ.',
  AUTH_EMAIL_NOT_VERIFIED: 'Email chưa được xác thực. Vui lòng kiểm tra hộp thư và xác thực email.',
  AUTH_SESSION_EXPIRED: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  AUTH_UNAUTHORIZED: 'Bạn cần đăng nhập để truy cập tính năng này.',
  AUTH_TOKEN_INVALID: 'Token không hợp lệ hoặc đã hết hạn.',
  AUTH_TOKEN_EXPIRED: 'Token đã hết hạn. Vui lòng yêu cầu token mới.',
  
  // User errors
  USER_NOT_FOUND: 'Không tìm thấy người dùng.',
  USER_ALREADY_EXISTS: 'Người dùng đã tồn tại.',
  USER_UPDATE_FAILED: 'Không thể cập nhật thông tin người dùng. Vui lòng thử lại.',
  USER_DELETE_FAILED: 'Không thể xóa tài khoản. Vui lòng liên hệ support.',
  
  // Subscription errors
  SUBSCRIPTION_EXPIRED: 'Gói sử dụng đã hết hạn. Vui lòng mua thêm ngày sử dụng.',
  SUBSCRIPTION_INSUFFICIENT_DAYS: 'Bạn không còn đủ ngày sử dụng. Vui lòng nâng cấp.',
  SUBSCRIPTION_PAYMENT_FAILED: 'Thanh toán thất bại. Vui lòng kiểm tra thông tin thẻ và thử lại.',
  SUBSCRIPTION_INVALID_PLAN: 'Gói đăng ký không hợp lệ.',
  
  // Task errors
  TASK_NOT_FOUND: 'Không tìm thấy công việc.',
  TASK_CREATE_FAILED: 'Không thể tạo công việc. Vui lòng thử lại.',
  TASK_UPDATE_FAILED: 'Không thể cập nhật công việc. Vui lòng thử lại.',
  TASK_DELETE_FAILED: 'Không thể xóa công việc. Vui lòng thử lại.',
  TASK_TITLE_REQUIRED: 'Tiêu đề công việc là bắt buộc.',
  TASK_DATE_INVALID: 'Ngày không hợp lệ.',
  
  // Habit errors
  HABIT_NOT_FOUND: 'Không tìm thấy thói quen.',
  HABIT_CREATE_FAILED: 'Không thể tạo thói quen. Vui lòng thử lại.',
  HABIT_UPDATE_FAILED: 'Không thể cập nhật thói quen. Vui lòng thử lại.',
  HABIT_DELETE_FAILED: 'Không thể xóa thói quen. Vui lòng thử lại.',
  HABIT_NAME_REQUIRED: 'Tên thói quen là bắt buộc.',
  HABIT_LOG_FAILED: 'Không thể ghi nhận thói quen. Vui lòng thử lại.',
  
  // Budget errors
  BUDGET_NOT_FOUND: 'Không tìm thấy ngân sách.',
  BUDGET_CREATE_FAILED: 'Không thể tạo ngân sách. Vui lòng thử lại.',
  BUDGET_UPDATE_FAILED: 'Không thể cập nhật ngân sách. Vui lòng thử lại.',
  BUDGET_DELETE_FAILED: 'Không thể xóa ngân sách. Vui lòng thử lại.',
  BUDGET_AMOUNT_INVALID: 'Số tiền ngân sách không hợp lệ.',
  BUDGET_EXCEEDED: 'Bạn đã vượt quá ngân sách cho danh mục này.',
  
  // Transaction errors
  TRANSACTION_NOT_FOUND: 'Không tìm thấy giao dịch.',
  TRANSACTION_CREATE_FAILED: 'Không thể tạo giao dịch. Vui lòng thử lại.',
  TRANSACTION_UPDATE_FAILED: 'Không thể cập nhật giao dịch. Vui lòng thử lại.',
  TRANSACTION_DELETE_FAILED: 'Không thể xóa giao dịch. Vui lòng thử lại.',
  TRANSACTION_AMOUNT_INVALID: 'Số tiền giao dịch không hợp lệ.',
  
  // Email errors
  EMAIL_SEND_FAILED: 'Không thể gửi email. Vui lòng thử lại sau.',
  EMAIL_VERIFICATION_FAILED: 'Xác thực email thất bại. Vui lòng thử lại.',
  EMAIL_ALREADY_VERIFIED: 'Email đã được xác thực.',
  
  // File errors
  FILE_UPLOAD_FAILED: 'Không thể tải file lên. Vui lòng thử lại.',
  FILE_TOO_LARGE: 'File quá lớn. Kích thước tối đa là 5MB.',
  FILE_INVALID_TYPE: 'Loại file không được hỗ trợ.',
  
  // Network errors
  NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.',
  SERVER_ERROR: 'Lỗi máy chủ. Vui lòng thử lại sau.',
  REQUEST_TIMEOUT: 'Yêu cầu quá thời gian chờ. Vui lòng thử lại.',
  
  // Validation errors
  VALIDATION_REQUIRED: 'Trường này là bắt buộc.',
  VALIDATION_EMAIL: 'Email không hợp lệ.',
  VALIDATION_MIN_LENGTH: 'Độ dài tối thiểu là {min} ký tự.',
  VALIDATION_MAX_LENGTH: 'Độ dài tối đa là {max} ký tự.',
  VALIDATION_NUMBER: 'Giá trị phải là số.',
  VALIDATION_POSITIVE: 'Giá trị phải lớn hơn 0.',
  
  // Generic errors
  UNKNOWN_ERROR: 'Đã xảy ra lỗi không xác định. Vui lòng thử lại.',
  FORBIDDEN: 'Bạn không có quyền truy cập tài nguyên này.',
  NOT_FOUND: 'Không tìm thấy tài nguyên.',
  BAD_REQUEST: 'Yêu cầu không hợp lệ.',
} as const;

export type ErrorCode = keyof typeof ERROR_MESSAGES;

/**
 * Get user-friendly error message from error code
 */
export function getErrorMessage(code: ErrorCode | string, params?: Record<string, string | number>): string {
  let message: string = ERROR_MESSAGES[code as ErrorCode] || ERROR_MESSAGES.UNKNOWN_ERROR;

  // Replace placeholders with params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, String(value));
    });
  }

  return message;
}

/**
 * Format API error response
 */
export function formatErrorResponse(code: ErrorCode | string, params?: Record<string, string | number>) {
  return {
    error: getErrorMessage(code, params),
    code,
  };
}

/**
 * Check if error is a known error code
 */
export function isKnownError(code: string): code is ErrorCode {
  return code in ERROR_MESSAGES;
}

