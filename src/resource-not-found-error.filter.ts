import { ExceptionFilter, Catch, ArgumentsHost} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from './core/domain/errors/domain.error';
import { ResourceNotFoundError } from './core/domain/errors/resource-not-found.error';

@Catch(ResourceNotFoundError)
export class ResourceNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 404;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message
      });
  }
}