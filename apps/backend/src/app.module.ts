import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RefreshCronService } from './modules/users/cron/refresh/refresh.service';
import { getTypeOrmConfig } from 'src/config/typeorm.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        await getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [RefreshCronService, AppService],
})
export class AppModule {}
