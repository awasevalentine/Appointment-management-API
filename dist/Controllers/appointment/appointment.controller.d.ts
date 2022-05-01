import { Response } from 'express';
import { CreateAppointmentDto } from 'src/Models/DTO/appointment.dto';
import { PaginationDto } from 'src/Models/Paginate/appointment.dto';
import { PaginatedProductsResultDto } from 'src/Models/Paginate/appointment.result.dto';
import { AppointmentService } from 'src/Services/appointment/appointment.service';
export interface me {
    data: any;
}
export declare class AppointmentController {
    private _appointmentService;
    constructor(_appointmentService: AppointmentService);
    createAppointment(payload: CreateAppointmentDto, response: Response): Promise<any>;
    getAllRunningAppointment(paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>;
    getAllCancelledAppointment(paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>;
    getAllCompletedAppointment(paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>;
    updateAppointment(id: any, appointmentUpdateDetails: any, response: Response): Promise<void>;
    cancelAppointment(id: any, data: any, response: Response): Promise<void>;
    markAsCompleteAppointment(id: any, data: any, response: Response): Promise<void>;
    deleteAppointment(id: any, response: Response): Promise<void>;
    getAppointmentCount(response: Response, userId: any): Promise<any>;
    sendMail(response: any): Promise<any>;
}
