/* eslint-disable prettier/prettier */
import {  HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import {  CreateAppointmentDto } from 'src/Models/DTO/appointment.dto';
import { AppointmentEntity } from 'src/Models/Entities/appointment.entity';
import { UserEntity } from 'src/Models/Entities/user.entity';
import { getAppointmentResponse } from 'src/Models/Interface/response';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/Models/Paginate/appointment.dto';
import { PaginatedProductsResultDto } from 'src/Models/Paginate/appointment.result.dto';
import { AppointmentStatus } from 'src/Models/Interface/appointment-status.enum';
import { Cron, SchedulerRegistry } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AppointmentService  {

  private readonly logger = new Logger(AppointmentService.name);

    constructor(
        @InjectRepository(AppointmentEntity)
        private _appointmentRepo: Repository<AppointmentEntity>,
        @InjectRepository(UserEntity) private _userRepo: Repository<UserEntity>,
        private schedulerRegistry: SchedulerRegistry,
    ){}

    async createAppointment(payload: CreateAppointmentDto): Promise<string>{
        const { userAuthId, ...data } = payload;
        const foundUser = await this._userRepo.findOne({where: {auth_id: userAuthId}})
        const {password, ...result } = foundUser
          data.date_created = new Date()
        const newAppointment = await this._appointmentRepo.create({...data, userAuthId: result});
        const saveAppointment = await this._appointmentRepo.save(newAppointment);
        if(saveAppointment){
          // this.findNameExist(payload).then((res) =>{
          //   return res
          // },
          // (err) => {
          //   return err
          // }
          // )
          // this._mailService.sendConfirmation(data)
            return `Appointment created successfully`
        }
        return;
    } 

    async getAllAppointmentForCronJob(): Promise<any>{
      const resp = await this._appointmentRepo.createQueryBuilder("appointments")
      .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
      .getMany();
      return resp
    }




    //Section for fetching all active/running Appointments from the DB
      async getAllRunningAppointment(userId, paginationDto: PaginationDto): Promise<PaginatedProductsResultDto> {
        const skippedItems = (paginationDto.page) * paginationDto.limit;
        let totalCountRunning = 0;
        /**Section for getting total count */
        await this._appointmentRepo.createQueryBuilder("appointments")
        .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
        .where("status = 'running'")
        .getCount().then(
          (res) =>{
            totalCountRunning = res
          },
          (err) => {
              throw new HttpException(err.message, err.statusCode)
          }
      );/**End of Total count */

      /**Section for fetching running task */
        const products = await this._appointmentRepo.createQueryBuilder('appointments')
          .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
          .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
          .andWhere("status = 'running'")
          // .orderBy('date_created', "DESC")
          .skip(skippedItems)
          .take(paginationDto.limit)
          .getMany()
        return {
          totalCount: totalCountRunning,
          page: paginationDto.page,
          limit: paginationDto.limit,
          data: getAppointmentResponse(await products),
        }
      }


        //   getAllRunningAppointment2(options: IPaginationOptions, userId): Observable<Pagination<AppointmentEntity>>{
        //  console.log("Okay -> ", options.page, "And Limit is -> ", options.limit)
        //  console.log("hhhmm", Number(options.page) * Number(options.page))
        //  const { userid } = userId
        //  console.log("userId", userid)
        //   return from(this._appointmentRepo.findAndCount({
        //     skip: Number(options.page) * Number(options.page) || 0,
        //     take: Number(options.limit) || 10,
        //     order: {appointment_id: 'ASC'},
        //     relations: ['userAuthId'],
        //     select: ['appointment_id','title','appointment_date','appointment_description',
        //     'appointment_time','date_created','name','status','userAuthId'
        //   ],
        //   where:({userAuthId: 12, status: "running"})
        
        //     // where: [
        //     //   {
        //     //   userAuthId: userId
        //     //   }
        //     // ]
        //   })).pipe(
        //     map(([appointments, totalAppointments]) => {
        //       const userPageble: Pagination<AppointmentEntity> = {
        //         items: appointments,
        //         links: {
        //           first: options.route + `?limit=${options.limit}`,
        //           previous: options.route + ``,
        //           next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
        //           last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalAppointments / Number(options.limit))}`
        //         },
        //         meta: {
        //           currentPage: Number(options.page),
        //           itemCount: appointments.length,
        //           itemsPerPage: Number(options.limit),
        //           totalItems: totalAppointments,
        //           totalPages: Math.ceil(totalAppointments / Number(options.limit))
        //         }
        //       };
        //       console.log(userPageble)
        //       return userPageble;
        //     })
        //   )
        // }



    //Section for fetching all cancelled Appointments from the DB
    async getAllCancelledAppointment(userId, paginationDto: PaginationDto): Promise<PaginatedProductsResultDto> {
      const skippedItems = (paginationDto.page) * paginationDto.limit;
      let totalCountRunning = 0;
      /**Section for getting total count */
      await this._appointmentRepo.createQueryBuilder("appointments")
      .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
      .where("status = 'cancel'")
      .getCount().then(
        (res) =>{
          totalCountRunning = res
        },
        (err) => {
            throw new HttpException(err.message, err.statusCode)
        }
    );/**End of Total count */

    /**Section for fetching running task */
      const products = await this._appointmentRepo.createQueryBuilder('appointments')
        .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
        .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
        .andWhere("status = 'cancel'")
        // .orderBy('date_created', "DESC")
        .skip(skippedItems)
        .take(paginationDto.limit)
        .getMany()
      return {
        totalCount: totalCountRunning,
        page: paginationDto.page,
        limit: paginationDto.limit,
        data: getAppointmentResponse(await products),
      }
    }

          //Section for fetching all completed Appointments from the DB
            async getAllCompletedAppointment(userId, paginationDto: PaginationDto): Promise<PaginatedProductsResultDto> {
              const skippedItems = (paginationDto.page) * paginationDto.limit;
              let totalCountRunning = 0;
              /**Section for getting total count */
              await this._appointmentRepo.createQueryBuilder("appointments")
              .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
              .where("status = 'complete'")
              .getCount().then(
                (res) =>{
                  totalCountRunning = res
                },
                (err) => {
                    throw new HttpException(err.message, err.statusCode)
                }
            );/**End of Total count */
        
            /**Section for fetching running task */
              const products = await this._appointmentRepo.createQueryBuilder('appointments')
                .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
                .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
                .andWhere("status = 'complete'")
                // .orderBy('date_created', "DESC")
                .skip(skippedItems)
                .take(paginationDto.limit)
                .getMany()
              return {
                totalCount: totalCountRunning,
                page: paginationDto.page,
                limit: paginationDto.limit,
                data: getAppointmentResponse(await products),
              }
            }



      async updateAppointment(id: any, payload: any): Promise<any> {
        const {userAuthId, } = payload;
        const foundUser = await this._userRepo.findOne({where:{auth_id: userAuthId}});
        const foundAppointment = await this._appointmentRepo.findOne({where:{appointment_id: id}});
        if(!foundUser){
            throw new HttpException("User with the provided AuthId not found", HttpStatus.NOT_FOUND)
        } 
        if(!foundAppointment){
            throw new HttpException(`appointment with the given ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        else {
            foundAppointment.title = payload.title;
            foundAppointment.appointment_description = payload.appointment_description;
            foundAppointment.name = payload.name;
            foundAppointment.appointment_date = payload.appointment_date;
            foundAppointment.appointment_time = payload.appointment_time;
            foundAppointment.status = payload.status;
            foundAppointment.date_updated = new Date()
            const saveUpdate = await this._appointmentRepo.update(id, foundAppointment);
            if(saveUpdate){
                return "Appointment successfully updated!"
            }
            
        }

      }


      //For Updating reminder for job cron
      async updateReminder(id: any, payload) {
        const foundAppointment = await this._appointmentRepo.findOne({where: {appointment_id: id}});
        if(!foundAppointment){
          throw new HttpException(`Appointment with id ${id} not found`, HttpStatus.NOT_FOUND )
        }
        foundAppointment.reminder = payload;
        const saveAppointment = await this._appointmentRepo.update(id, foundAppointment);
        if(saveAppointment){
          return 'Reminder sent and data updated.'
        }
      }


      async deleteAppointment(id: any): Promise<any>{
          const foundAppointment = await this._appointmentRepo.findOne({where: {appointment_id: id}});
          if(!foundAppointment){
              throw new HttpException(`Appointment with the following ID ${id} wasn't found`, HttpStatus.NOT_FOUND)
          } else {
              const deleteAppointment = await this._appointmentRepo.delete(id);
              if(deleteAppointment){
                  return 'Appointment was successfully deleted!'
              }
          }
      }


        /* this implementation doesn't delete the appointment from the database, but rather 
      changes the status of the appointment to cancel, so that it can no longer been 
      returned from the search of running task
      */
      async cancelAppointment(id: any): Promise<any>{
        const foundAppointment = await this._appointmentRepo.findOne({where: {appointment_id: id}});
        if(!foundAppointment){
            throw new HttpException(`Appointment with the following ID ${id} wasn't found`, HttpStatus.NOT_FOUND)
        } else {
            foundAppointment.status = AppointmentStatus.CANCEL
            const cancelAppointment = await this._appointmentRepo.save(foundAppointment);
            if(cancelAppointment){
                return 'Appointment was successfully Canceled!'
            }
        }
    }

            /* this implementation doesn't delete the appointment from the database, but rather 
      changes the status of the appointment to cancel, so that it can no longer been 
      returned from the search of running task
      */
      async markAsCompleteAppointment(id: any): Promise<any>{
        const foundAppointment = await this._appointmentRepo.findOne({where: {appointment_id: id}});
        if(!foundAppointment){
            throw new HttpException(`Appointment with the following ID ${id} wasn't found`, HttpStatus.NOT_FOUND)
        } else {
            foundAppointment.status = AppointmentStatus.COMPLETE
            const markAsComplete = await this._appointmentRepo.save(foundAppointment);
            if(markAsComplete){
                return 'Appointment is successfully Completed!'
            }
        }
    }


     async getAllAppointmentCount(userId: any): Promise<any>{
        const totalCount = {
          runningCount: 0,
          cancelledCount: 0,
          completedCount: 0
        }
        await this._appointmentRepo.createQueryBuilder("appointments")
        .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
        .andWhere("status = 'running'")
        .getCount().then(
            (res) =>{
                return totalCount.runningCount = res
            },
            (err) => {
                throw new HttpException(err.message, err.statusCode)
            }
        );

        await this._appointmentRepo.createQueryBuilder("appointments")
        .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
        .where("status = 'cancel'")
        .getCount().then(
            (res) =>{
                totalCount.cancelledCount = res
            },
            (err) => {
                throw new HttpException(err.message, err.statusCode)
            }
        );

        await this._appointmentRepo.createQueryBuilder("appointments")
        .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", {userAuthIdAuthId: userId})
        .where("status = 'completed'")
        .getCount().then(
            (res) =>{
                totalCount.completedCount = res
            },
            (err) => {
                throw new HttpException(err.message, err.statusCode)
            }
        );
            return totalCount
    }
}
