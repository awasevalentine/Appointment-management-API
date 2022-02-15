/* eslint-disable prettier/prettier */
import { AppointmentStatus } from '../Interface/appointment-status.enum';

/* eslint-disable prettier/prettier */
export interface CreateAppointmentDto{
    userAuthId: string;
    title: string;
    name: string;
    appointment_description: string;
    appointment_date: Date;
    appointment_time: string;
    status?: AppointmentStatus;
}


export interface AppointmentResponseDetails {
    appointment_id: string;
    userAuthId: string;
    title: string;
    name: string;
    status?: AppointmentStatus
    appointment_description: string;
    appointment_date: Date;
    appointment_time: string;
    date_created?: Date;
    date_updated?: Date;
    date_deleted?: Date; 
}