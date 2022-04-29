import { MailService } from './../../Services/mail/mail.service';
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateAppointmentDto } from 'src/Models/DTO/appointment.dto';
import { JwtAuthGuard } from 'src/Models/Guards/jwt.strategy';
import { ApiResponse } from 'src/Models/Interface/response';
import { PaginationDto } from 'src/Models/Paginate/appointment.dto';
import { PaginatedProductsResultDto } from 'src/Models/Paginate/appointment.result.dto';
import { AppointmentService } from 'src/Services/appointment/appointment.service';

export interface me{
    data: any
}


@Controller('appointment/api')
export class AppointmentController {

    constructor(private _appointmentService: AppointmentService,
        // private _mailService: MailService
        ){
            
        }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async createAppointment(@Body() payload: CreateAppointmentDto, @Res() response: Response): Promise<any>{
       const _response = new ApiResponse();
        return this._appointmentService.createAppointment(payload).then(
            (data) => {
                _response.data = data;
                _response.responseCode = "200"
                _response.responseDescription = 'Appointment creation'
                response.send(_response)
            },
            (error) =>{
                _response.data = error;
                _response.responseCode = error.statusCode
                _response.responseDescription;
                throw new HttpException(_response, error.statusCode)
            }
        )
    }

//Section for fetching all RUNNING APPOINTMENTS
    @UseGuards(JwtAuthGuard)
    @Get('/all-running/appointments')
    getAllRunningAppointment(@Query() paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>{
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);
        const userId = paginationDto.userId;


        return this._appointmentService.getAllRunningAppointment(userId, {
            ...paginationDto,
            limit: paginationDto.limit > 100 ? 100 : paginationDto.limit
        })
    }


    //Section for getting all CANCELLED APPOINTMENTS
    @UseGuards(JwtAuthGuard)
    @Get('/all-cancelled/appointments')
    getAllCancelledAppointment(@Query() paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>{
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);
        const userId = paginationDto.userId;

        return this._appointmentService.getAllCancelledAppointment(userId, {
            ...paginationDto,
            limit: paginationDto.limit > 100 ? 100 : paginationDto.limit
        })
    }


    //Section for fetching all COMPLETED APPOINTMENTS
    @UseGuards(JwtAuthGuard)
    @Get('/all-completed/appointments')
    getAllCompletedAppointment(@Query() paginationDto: PaginationDto): Promise<PaginatedProductsResultDto>{
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);
        const userId = paginationDto.userId;

        return this._appointmentService.getAllCompletedAppointment(userId, {
            ...paginationDto,
            limit: paginationDto.limit > 100 ? 100 : paginationDto.limit
        })
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update_appointment/:id')
    updateAppointment(@Param('id') id: any, @Body() appointmentUpdateDetails: any, @Res() response: Response){
       const _response = new ApiResponse();
        return this._appointmentService.updateAppointment(id, appointmentUpdateDetails).then(
            (res) =>{
                console.log("Data ", res)
                _response.data = res;
                _response.responseCode = "200"
                _response.responseDescription = 'Appointment successfully updated'
                response.send(_response)
            },
            (error) =>{
                console.log("Data ", error)
                _response.data = error.message;
                _response.responseCode = error.statuCode
                // _response.responseDescription = 'Appointment successfully updated'
                response.send(_response)
            }
        )
    }


// this section is for cancelling appointments
    @UseGuards(JwtAuthGuard)
    @Put('/cancel/:id')
    cancelAppointment(@Param('id') id: any, @Body() data: any, @Res() response: Response){
        const _responseMsg = new ApiResponse()
        return this._appointmentService.cancelAppointment(id).then(
            (data) => {
                _responseMsg.data = data;
                _responseMsg.responseCode = "200";
                _responseMsg.responseDescription = "Successful"
                response.send(_responseMsg)
            },
            (error) =>{
                _responseMsg.data = error.message;
                _responseMsg.responseCode = error.statuscode;
                response.send(_responseMsg)
            }
        )
    }


    // this section is for cancelling appointments
    @UseGuards(JwtAuthGuard)
    @Put('/markcomplete/:id')
    markAsCompleteAppointment(@Param('id') id: any, @Body() data: any, @Res() response: Response){
        const _responseMsg = new ApiResponse()
        return this._appointmentService.markAsCompleteAppointment(id).then(
            (data) => {
                _responseMsg.data = data;
                _responseMsg.responseCode = "200";
                _responseMsg.responseDescription = "Successfull"
                response.send(_responseMsg)
            },
            (error) =>{
                _responseMsg.data = error.message;
                _responseMsg.responseCode = error.statuscode;
                response.send(_responseMsg)
            }
        )
    }


//This section is for deleting appointments
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    deleteAppointment(@Param('id') id: any, @Res() response: Response){
        const _responseMsg = new ApiResponse()
        return this._appointmentService.deleteAppointment(id).then(
            (data) => {
                _responseMsg.data = data;
                _responseMsg.responseCode = "200";
                _responseMsg.responseDescription = "Successful"
                response.send(_responseMsg)
            },
            (error) =>{
                _responseMsg.data = error.message;
                _responseMsg.responseCode = error.statuscode;
                response.send(_responseMsg)
            }
        )
    }



    @UseGuards(JwtAuthGuard)
    @Get('/total_counts/:userId')
    getAppointmentCount(@Res() response: Response, @Param('userId') userId): Promise<any>{
        const _responseMsg = new ApiResponse();
                
        return this._appointmentService.getAllAppointmentCount(userId).then(
            (data)=>{
                
                _responseMsg.data = data;
                _responseMsg.responseCode = "200";
                _responseMsg.responseDescription = "Appointment Total counts"
                console.log(data)
                response.send(_responseMsg)
            },
            (error)=> {
                _responseMsg.data = error.message;
                _responseMsg.responseCode = error.statuscode;
                response.send(_responseMsg)
            }
            )
    }

    @Post('/mail')
    async sendMail(@Res() response): Promise<any> {
        const sender = "valentinebassey02@gmail.com";
        const sendTo = "awasevalentine@gmail.com";
        const subject = "Testing";
        const title = " First test";
        const content = "Okay"
        const payload = {sender, sendTo, subject, title, content}
        // await this._mailService.sendConfirmation(payload).then((res) => {
        //     response.json({message: "Appointment booking message sent!"})
        // })
    }

}

function appointmentMailDto(payload: { sender: string; sendTo: string; subject: string; title: string; content: string; }, appointmentMailDto: any) {
    throw new Error('Function not implemented.');
}

