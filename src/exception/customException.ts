import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(code, message, data = '') {
    super({ code, message, data }, 200);
  }
}
