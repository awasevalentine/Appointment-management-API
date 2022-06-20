/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { AppointmentStatus, Reminder } from '../Interface/appointment-status.enum';

export const AppointmentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    appointment_description: {
        type: String,
        required: true
    },
    appointment_date: {
        type: Date,
        required: true
    },
    appointment_time: {
        type: String
    },

    status: {
        enum: AppointmentStatus,
        default: AppointmentStatus.RUNNING,
        type: AppointmentStatus
    },

    reminder: {
        enum: Reminder,
        default: Reminder.NOT_SENT,
        type: Reminder
    },

    appointment_email: {
        default: "awasevalentine@gmail.com",
        type: String
    },

    // date_created: {
    //     type: Date
    // },

    // date_updated: {
    //     type: Date
    // },

    // date_deleted: {
    //     type: Date
    // }
},
{
    timestamps: true
})