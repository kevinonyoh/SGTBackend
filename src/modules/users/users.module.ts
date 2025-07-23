import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailModule } from 'src/shared/notification/email/email.module';
import { CacheStoreModule } from 'src/shared/cache-store/cache-store.module';
import { UsersModel } from './models/users.model.';

@Module({
  imports: [SequelizeModule.forFeature([UsersModel]), EmailModule, CacheStoreModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
