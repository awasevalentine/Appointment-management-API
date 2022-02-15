/* eslint-disable prettier/prettier */
import { AppointmentEntity } from "../Entities/appointment.entity"

export class PaginatedProductsResultDto {
  data: AppointmentEntity[]
  page: number
  limit: number
  totalCount: number
}

export class AllAppointmentResultDto {
  // runningAppointment: AppointmentEntity[];
  // cancelledAppointment: AppointmentEntity[];
  // completedAppointment: AppointmentEntity[];
  runningCount: any;
  // cancelledCount: number;
  // completedCount: number
}

export class DataType {
  running: string;
  cancelled: string;
  completed: string;
  userId: any
}