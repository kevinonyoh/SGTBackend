

import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { TransactionInterceptor } from "./interceptors/transaction.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { RoleGuard } from "./guards/role.guard";

export const appProvider = [
    {
        provide: APP_GUARD, 
        useClass: AuthGuard
    }, 
    {
        provide: APP_GUARD, 
        useClass: RoleGuard
    }, 
    {
        provide: APP_INTERCEPTOR, 
        useClass: TransformInterceptor
    },
    {
        provide: APP_INTERCEPTOR, 
        useClass: TransactionInterceptor
    },
    {
        provide: APP_PIPE,
        useValue: new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true }
        })
    }
];