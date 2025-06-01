import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModuleAsyncOptions } from "@nestjs/sequelize";


export const databaseConfig: SequelizeModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('dbUsername'),
      password: configService.get<string>('dbPassword'),
      database: configService.get<string>('dbName'),
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      models: [],
      autoLoadModels: true,
      synchronize: false,
    }),
    inject: [ConfigService],
};