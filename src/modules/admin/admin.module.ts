import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModel } from './models/admin.model';
import { CacheStoreModule } from 'src/shared/cache-store/cache-store.module';
import { ConfigModule } from '@nestjs/config';
import { AdminRepository } from './repositories/admin.repository';
import { EmailModule } from 'src/shared/notification/email/email.module';

@Module({
  imports: [ SequelizeModule.forFeature([AdminModel]), CacheStoreModule, ConfigModule, EmailModule],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService]
})
export class AdminModule {}
