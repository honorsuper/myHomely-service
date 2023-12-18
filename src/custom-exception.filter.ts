import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.statusCode = 200;
    const res = exception.getResponse() as {
      code: number;
      message: string;
      data: unknown;
    };

    const code = res?.code || exception.getStatus();
    const message = res?.message || res;
    const data = res?.data || '';

    response
      .json({
        code,
        message,
        data,
      })
      .end();
  }
}
