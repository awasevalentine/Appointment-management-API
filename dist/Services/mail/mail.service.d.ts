import { AppointmentEntity } from 'src/Models/Entities/appointment.entity';
import { AppointmentService } from './../appointment/appointment.service';
import { UserEntity } from 'src/Models/Entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { appointmentMailDto } from 'src/Models/Interface/mail/appointmentMailDto';
import { Repository } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class MailService {
    private _appointmentService;
    private _mailerService;
    private _userRepo;
    private _appointmentRepo;
    private schedulerRegistery;
    private readonly logger;
    constructor(_appointmentService: AppointmentService, _mailerService: MailerService, _userRepo: Repository<UserEntity>, _appointmentRepo: Repository<AppointmentEntity>, schedulerRegistery: SchedulerRegistry);
    sendConfirmation(payload: appointmentMailDto): Promise<void>;
    findNameExist(payload: any): Promise<any>;
    eightAMReminder(): void;
    getSchedules(): Promise<any>;
}
