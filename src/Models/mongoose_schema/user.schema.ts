/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    account_type: {
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    // date_created: {
    //     type: Date
    // },

    // date_updated: {
    //     type: Date
    // },
    appointment_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }]
},
{timestamps: true});

