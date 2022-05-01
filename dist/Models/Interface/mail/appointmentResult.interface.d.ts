import { UserEntity } from './../../Entities/user.entity';
export interface AppointmentDataResp {
    appointment_id: string;
    title: string;
    name: string;
    appointment_description: string;
    appointment_date: Date;
    appointment_time: string;
    appointment_email: string;
    status: string;
    reminder: string;
    date_created: Date;
    date_updated: Date;
    date_deleted: Date;
    userAuthId: UserEntity;
}
