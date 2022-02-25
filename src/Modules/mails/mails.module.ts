import { AppointmentService } from './../../Services/appointment/appointment.service';
import { AppointmentEntity } from './../../Models/Entities/appointment.entity';
import { UserEntity } from './../../Models/Entities/user.entity';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/Services/mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
        transport: {
          host: process.env.MAIL_HOST,
          service: process.env.MAIL_SERVICE,
          secure: false,
          auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
            from: '"No Reply" <noreply.com>',
        },
        template: {
            dir: join(__dirname, '../../mail/'),
            adapter: new HandlebarsAdapter(),
            options: {
                strict: true,
            },
        },
      }),
      TypeOrmModule.forFeature([UserEntity, AppointmentEntity]),

  ],
  providers: [MailService, AppointmentService],
  exports: [MailService]
})
export class MailsModule {}
