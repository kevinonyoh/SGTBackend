import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const TransactionParam = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        
        return request.transaction;
    }
);