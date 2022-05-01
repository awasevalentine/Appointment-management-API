import { AppointmentEntity } from './appointment.entity';
export declare class UserEntity {
    auth_id: string;
    email: string;
    fullName: string;
    account_type: string;
    password: string;
    appointments: AppointmentEntity[];
}
