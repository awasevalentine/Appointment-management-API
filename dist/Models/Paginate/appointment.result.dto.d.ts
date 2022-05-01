import { AppointmentEntity } from "../Entities/appointment.entity";
export declare class PaginatedProductsResultDto {
    data: AppointmentEntity[];
    page: number;
    limit: number;
    totalCount: number;
}
export declare class AllAppointmentResultDto {
    runningCount: any;
}
export declare class DataType {
    running: string;
    cancelled: string;
    completed: string;
    userId: any;
}
