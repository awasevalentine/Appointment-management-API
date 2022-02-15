/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  auth_id: string;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  account_type: string;

  @Column()
  password: string;

  // @Column()
  // provider?: string;


  @OneToMany(()=>AppointmentEntity, appointments => appointments.userAuthId)
  // @JoinColumn({name:'auth_id'})
  appointments: AppointmentEntity[];
}
