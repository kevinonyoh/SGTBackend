import { Module } from '@nestjs/common';
import { CacheStoreService } from './cache-store.service';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
    imports: [CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('redisHost'),
        port: configService.get<number>('redisPort'),
        password: configService.get<string>('redisPassword')
      })
    })],
    providers: [CacheStoreService],
    exports: [CacheStoreService]
  })
  export class CacheStoreModule {}