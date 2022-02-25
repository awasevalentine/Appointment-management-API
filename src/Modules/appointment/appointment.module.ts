import { MailService } from 'src/Services/mail/mail.service';
import { Module } from '@nestjs/common';
import { AppointmentController } from 'src/controllers/appointment/appointment.controller';
import { AppointmentEntity } from 'src/Models/Entities/appointment.entity';
import { UserEntity } from 'src/Models/Entities/user.entity';
import { AppointmentService } from 'src/services/appointment/appointment.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity, UserEntity]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
