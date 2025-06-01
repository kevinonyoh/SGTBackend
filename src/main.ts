import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {cors: true});

  const port = process.env.PORT;

  app.setGlobalPrefix('/api/v1');
  
  app.use(compression());

  app.use(loggerMiddleware);

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port, () => console.log(`App running on port ${port}`));

}
bootstrap();
