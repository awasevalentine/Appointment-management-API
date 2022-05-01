import { AppointmentStatus, Reminder } from "../Interface/appointment-status.enum";
import { UserEntity } from "./user.entity";
export declare class AppointmentEntity {
    appointment_id: string;
    title: string;
    name: string;
    appointment_description: string;
    appointment_date: Date;
    appointment_time: string;
    status: AppointmentStatus;
    reminder?: Reminder;
    appointment_email?: string;
    date_created: Date;
    date_updated?: Date;
    date_deleted: Date;
    userAuthId: UserEntity;
}
