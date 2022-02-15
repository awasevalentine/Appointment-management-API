import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from 'src/controllers/appointment/appointment.controller';
import { AppointmentEntity } from 'src/Models/Entities/appointment.entity';
import { UserEntity } from 'src/Models/Entities/user.entity';
import { AppointmentService } from 'src/services/appointment/appointment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, UserEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
