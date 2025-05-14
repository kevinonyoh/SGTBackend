import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";


@Injectable()
export class TransactionInterceptor implements NestInterceptor {
    private readonly logger = new Logger(TransactionInterceptor.name);
  
    constructor(@InjectConnection() private readonly sequelizeInstance: Sequelize) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();
        const transaction: Transaction = await this.sequelizeInstance.transaction();

        req.transaction = transaction;

        return next.handle().pipe(
            tap(() => {
                transaction.commit();
                this.logger.log('Transaction committed');
            }),
            catchError(err => {
                transaction.rollback();
                this.logger.log('An error occurred: Transaction rolled back');
                
                return throwError(() => err);
            })
        );
    }
}