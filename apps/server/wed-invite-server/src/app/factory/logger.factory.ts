import { Logger } from '@nestjs/common';

export  class  LoggerFactory {
  static create(context?: string) {
    return context ? new Logger(context) : new Logger();
  }
}
