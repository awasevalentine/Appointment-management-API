import { AppointmentModule } from './Modules/appointment/appointment.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './Models/Entities/user.entity';
import { AppointmentEntity } from './Models/Entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailsModule } from './Modules/mails/mails.module';
import { UserModule } from './Modules/user/user.module';
import { AuthModule } from './Modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['env.dev', 'env.prod'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: process.env.MYSQL_HOST_2,
      // host: 'localhost',
      // port: 3306,
      // username: process.env.MYSQL_USERNAME,
      // password: process.env.MYSQL_PASSWORD,
      // database: 'appointment_app',
      host: process.env.MYSQL_HOST_2,
      username: process.env.MYSQL_USER_2,
      password: process.env.MYSQL_PASSWORD_2,
      database: process.env.MYSQL_DB_2,
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
