import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { CoursesModule } from '../courses/courses.module';
import { UsersModule } from '../users/users.module';
import { PaymentModel } from './model/payment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlutterwaveGateway } from './payment-factory/payment-gateway/flutterwave.gateway';
import { PaymentRepository } from './repositories/payment.repository';
import { HttpRequestModule } from 'src/shared/http-request/http-request.module';

@Module({
  imports: [SequelizeModule.forFeature([PaymentModel]), CoursesModule, UsersModule, HttpRequestModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository, FlutterwaveGateway],
})
export class PaymentModule {}
