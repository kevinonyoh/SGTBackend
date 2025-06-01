import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('LoggerMiddleware');
    const formatLogger = new Logger();

    const requestInfo = {
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body,
        timeStamp: new Date()
    };

    
    formatLogger.log('\r=============================Request Information=============================');
    logger.log(JSON.stringify(requestInfo));
    formatLogger.log('\r=============================Request Information=============================');

    next();
}