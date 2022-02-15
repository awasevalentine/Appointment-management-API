/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, Param, Post, Res, UseFilters, UseGuards} from '@nestjs/common';
import { response, Response } from 'express';
import { UserRegistrationDto } from 'src/Models/DTO/user.dto';
import { JwtAuthGuard } from 'src/Models/Guards/jwt.strategy';
import { ApiResponse } from 'src/Models/Interface/response';
import { UserService } from 'src/Services/user/user.service';

@Controller('user/api')
export class UserController {
    constructor(private _userService: UserService){}

    @Post('/register')
    async createUser(@Body() userData: UserRegistrationDto, @Res() response:Response): Promise<any>{
        let _apiResponse: ApiResponse<string> = new ApiResponse();
        return this._userService.createUser(userData).then(
            (data) => {
                _apiResponse.data = data;
                _apiResponse.responseCode ="200";
                response.send(_apiResponse)
            },
            (err) => {
                _apiResponse.data = err.message
                _apiResponse.responseCode = err.statusCode;
                _apiResponse.responseDescription = err.error;
                throw new HttpException(_apiResponse, 409)
            }
        )
    }

    @Get('/users')
    // @UseGuards(JwtAuthGuard)
    getAllUsers(@Res() response: Response){
        let _apiResponse = new ApiResponse()
        return this._userService.getAllUsers().then(
            (data) => {
                const {password, ...result} =data

                _apiResponse.data = result;
                _apiResponse.responseCode = "200"
                response.send(_apiResponse)
            },
            (err) => {
                _apiResponse.data = err.message
                _apiResponse.responseCode = err.statusCode;
                _apiResponse.responseDescription = err.error;
                throw new HttpException(_apiResponse, 999)
            }
        )
    }

    @Get('/user/:userEmail')
    @UseGuards(JwtAuthGuard)
    getUserById(@Param("userEmail")userEmail: string, @Res() response: Response){
        let _apiResponse = new ApiResponse();
        return this._userService.getUserById(userEmail).then(
            (data) => {
                const {password, ...result} =data;
                _apiResponse.data = result;
                _apiResponse.responseCode = "200"
                response.send(_apiResponse);
            },
            (err) =>{
                _apiResponse.data = err.message
                _apiResponse.responseCode = err.statusCode;
                _apiResponse.responseDescription = err.error;
                throw new HttpException(_apiResponse, 999)

            }
        );
    }


    @Delete('user/:userEmail')
    @UseGuards(JwtAuthGuard)
    deleteUserByEmail(@Param("userEmail") userEmail: string, @Res() response: Response){
        let _apiResponse = new ApiResponse()
        return this._userService.deleteUserById(userEmail).then(
            (data)=>{
                _apiResponse.data = data;
                _apiResponse.responseCode = "200";
                response.send(_apiResponse)
            },
            (err)=> {
                _apiResponse.data = err.message
                _apiResponse.responseCode = err.statusCode;
                _apiResponse.responseDescription = err.error;
                throw new HttpException(_apiResponse, 999)
                
            }
        );
    }


    // @MessagePattern("updateUserdetails")
    // @UseGuards(JwtAuthGuard)
    // updateUserdetails(@Param() userEmail: string, @Body() userData: any){
    //     return this._userService.updateUserdetails(userEmail, userData).then();
    // }
}
