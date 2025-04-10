type LogLevel = 'info' | 'warn' | 'error';

interface Logger {
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
}

export const createLogger = (context: string): Logger => {
  const log = (level: LogLevel, message: string, ...args: any[]) => {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${context}] [${level.toUpperCase()}]`;
    
    switch (level) {
      case 'info':
        console.log(prefix, message, ...args);
        break;
      case 'warn':
        console.warn(prefix, message, ...args);
        break;
      case 'error':
        console.error(prefix, message, ...args);
        break;
    }
  };

  return {
    info: (message: string, ...args: any[]) => log('info', message, ...args),
    warn: (message: string, ...args: any[]) => log('warn', message, ...args),
    error: (message: string, ...args: any[]) => log('error', message, ...args),
  };
}; 