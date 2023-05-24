import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
JwtModule.register;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
