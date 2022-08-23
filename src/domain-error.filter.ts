
import { ExceptionFilter, Catch, ArgumentsHost} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from './core/domain/errors/domain.error';

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 403;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message
      });
  }
}
