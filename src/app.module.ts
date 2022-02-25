import { AppointmentModule } from './Modules/appointment/appointment.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './Models/Entities/user.entity';
import { AppointmentEntity } from './Models/Entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsModule } from './Modules/mails/mails.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [UserEntity, AppointmentEntity],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    AppointmentModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
