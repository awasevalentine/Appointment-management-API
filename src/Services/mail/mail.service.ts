import { AppointmentEntity } from 'src/Models/Entities/appointment.entity';
import { AppointmentService } from './../appointment/appointment.service';
import { UserEntity } from 'src/Models/Entities/user.entity';
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, OnModuleInit, forwardRef, Inject, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { appointmentMailDto } from 'src/Models/Interface/mail/appointmentMailDto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { AppointmentDataResp } from 'src/Models/Interface/mail/appointmentResult.interface';
import { CronJob } from 'cron';

@Injectable()
export class MailService {

  private readonly logger = new Logger(AppointmentService.name);


  constructor(
    private _appointmentService: AppointmentService,
    private _mailerService: MailerService,
    @InjectRepository(UserEntity) private _userRepo: Repository<UserEntity>,
    @InjectRepository(AppointmentEntity) private _appointmentRepo: Repository<AppointmentEntity>,
    private schedulerRegistery: SchedulerRegistry
  ) {}


  async sendConfirmation(payload: appointmentMailDto) {
    await this._mailerService.sendMail({
      to: payload.sendTo,
      from: payload.sender,
      subject: payload.subject,
      //   template: '/dist/mail/templates/confirmation',
      html: `
        <html>
            <body>
                    <h1 style="text-align: center; "><b>${payload.title}</b></h1>
                    <p>${payload.content}</p>
            </body>
        </html>
      `,
    });
  }


  
    /**Method for findin if the name of the person or 
     * organization already exist on the database.
     * Note: this is in cases where there is no email provided.
     * */
     async findNameExist(payload: any): Promise<any>{
        const { appointment_email, name, title, appointment_description, userAuthId } = payload
          const foundName  = await this._userRepo.findOne({fullName: name})
          console.log("Was found ", foundName)
          const msgSender = await this._userRepo.findOne({auth_id: userAuthId})
          const emailPayload = {sender: msgSender.email, sendTo: appointment_email, title: title, subject: msgSender.fullName, content: appointment_description}
          if(appointment_email){
            this.sendConfirmation(emailPayload).then((res)=> 
            {
              return {messageSendSuccess: 'Appointment notification sent' }
            })
          }
          if(!appointment_email){
            const emailPayload2 = {sender: msgSender.email, sendTo: foundName.email, title: title, subject: msgSender.fullName, content: appointment_description}
            this.sendConfirmation(emailPayload2).then((res)=> 
            {
              return {messageSendSuccess: 'Appointment notification sent' }
            })
          if(!(appointment_email) && !(foundName)){

            return {messageSendFail: `This user: ${name} does not exist on the system. '\n'
                    Please provide an Email address we can send message to
            `}
          }
      }
    }



  // scheduleJob(){
  //   const schedules = this.getSchedules().then(
  //     (response) => {
  //       response.forEach(schedule => {
  //         const timeNow: any = new Date();
  //         const timeDiffInMillSec = (schedule.appointment_time - timeNow);
  //         const timeDiffInHours = Math.floor((timeDiffInMillSec % 86400000) / 3600000);
  //         const timeDiffInMins = Math.round(((timeDiffInMillSec % 86400000) % 3600000) / 60000);
  //         if(timeDiffInHours <=10 && schedule.reminderNotSent){
  //               // trigger send 10hrs reminder
  //         }
  //     //do same for 2hr-30Mins reminder like same above for 10hr reminders
  //     })
  //     },
  //   );
  // }

  // //scheduler Cron Job for running all of the cron job for every seconds
  // @Cron('*/10 * * * * *', {
  //   name: 'sendReminder'
  // })
  // checkEverySecond() {
  //   this.schedulerRegistery.getCronJob('_8AmReminder').stop()
  // }


  // This scheduler job runs at 8Am of the scheduled appointment date
  @Cron(' * * 8 * * * ', {
    name: '_8AmReminder'
  })
  eightAMReminder() {
    this.getSchedules().then(
      (result) => {
        result.forEach((res:AppointmentDataResp) => {
          const { appointment_id, 
                  appointment_description,
                  appointment_email, name, title,appointment_date,
                  userAuthId:{ auth_id}
                } = res

          const payload = {
              name: name,
              title: title,
              appointment_description: appointment_description,
              appointment_email: appointment_email,
              userAuthId: auth_id
          }
          const appointmentDate = new Date(appointment_date).toISOString().substring(0,10);
          const timeNow = new Date().toISOString().substring(0,10);

          if((appointmentDate == timeNow) && res.reminder == 'no'){
            this.findNameExist(payload).then(
              (response) => {
                if(response){
                  this._appointmentService.updateReminder(appointment_id, res.reminder = 'yes').then(
                    (result) => {
                        this.logger.debug(result)
                    },
                    (err) => {
                      throw new Error(`For Error: ${err}`)
                    }
                  )
                }
              }
            )
          }
        })
      }
    )
    // this.schedulerRegistery.getCronJob('_8AmReminder').stop()
  }

  //Method for fetching all schedules from the DB
  async getSchedules() {
        return await this._appointmentService.getAllAppointmentForCronJob().then(
          (res) => {
            return res
          },
          (err) =>{
            this.logger.debug(err.message)
          }
        )
      }
}
