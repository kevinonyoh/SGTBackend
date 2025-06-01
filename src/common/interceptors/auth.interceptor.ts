import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator';

interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}

@Injectable()
export class AuthInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const httpContext = context.switchToHttp();

        const req = httpContext.getRequest();

        const { username, email } = req.body;

        const notAllowed = [username, email].every(val => !val);

        if (notAllowed) throw new BadRequestException('Username or Email is required');

        return next.handle();
    }
}
