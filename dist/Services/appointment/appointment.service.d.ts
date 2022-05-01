import { CreateAppointmentDto } from 'src/Models/DTO/appointment.dto';
import { AppointmentEntity } from 'src/Models/Entities/appointment.entity';
import { UserEntity } from 'src/Models/Entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/Models/Paginate/appointment.dto';
import { PaginatedProductsResultDto } from 'src/Models/Paginate/appointment.result.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class AppointmentService {
    private _appointmentRepo;
    private _userRepo;
    private schedulerRegistry;
    private readonly logger;
    constructor(_appointmentRepo: Repository<AppointmentEntity>, _userRepo: Repository<UserEntity>, schedulerRegistry: SchedulerRegistry);
    createAppointment(payload: CreateAppointmentDto): Promise<string>;
    getAllAppointmentForCronJob(): Promise<any>;
    getAllRunningAppointment(userId: any, paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>;
    getAllCancelledAppointment(userId: any, paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>;
    getAllCompletedAppointment(userId: any, paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>;
    updateAppointment(id: any, payload: any): Promise<any>;
    updateReminder(id: any, payload: any): Promise<string>;
    deleteAppointment(id: any): Promise<any>;
    cancelAppointment(id: any): Promise<any>;
    markAsCompleteAppointment(id: any): Promise<any>;
    getAllAppointmentCount(userId: any): Promise<any>;
}
