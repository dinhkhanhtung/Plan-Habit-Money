// Simple logger that works on both client and server
const logger = {
  error: (message: string, meta?: any) => {
    console.error(message, meta);
  },
  warn: (message: string, meta?: any) => {
    console.warn(message, meta);
  },
  info: (message: string, meta?: any) => {
    console.info(message, meta);
  },
  debug: (message: string, meta?: any) => {
    console.debug(message, meta);
  },
};

export { logger };
export default logger;