/* eslint-disable prettier/prettier */
import { type } from "os";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { AppointmentStatus } from "../Interface/appointment-status.enum";
import { UserEntity } from "./user.entity";



@Entity({name: 'appointments'})
export class AppointmentEntity {
    @PrimaryGeneratedColumn()
    appointment_id: string

    @Column()
    title: string;

    @Column()
    name: string;

    @Column()
    appointment_description: string;

    @Column()
    appointment_date: Date;

    @Column()
    appointment_time: string

    @Column({type: "enum", enum: AppointmentStatus, default: AppointmentStatus.RUNNING})
    status: AppointmentStatus;

    @CreateDateColumn()
    date_created: Date;

    @UpdateDateColumn()
    date_updated: Date;

    @DeleteDateColumn()
    date_deleted: Date

    @ManyToOne(()=> UserEntity, userAuthId => userAuthId.appointments)
    userAuthId: UserEntity
}