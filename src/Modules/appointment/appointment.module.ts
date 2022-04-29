import { MailService } from 'src/Services/mail/mail.service';
import { Module } from '@nestjs/common';
import { AppointmentEntity } from 'src/Models/Entities/appointment.entity';
import { UserEntity } from 'src/Models/Entities/user.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from 'src/Services/appointment/appointment.service';
import { AppointmentController } from 'src/Controllers/appointment/appointment.controller';
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
