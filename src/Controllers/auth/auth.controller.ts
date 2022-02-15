/* eslint-disable prettier/prettier */
import { Controller, Get, HttpException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/Services/auth/auth.service';
import { LocalAuthGuard } from 'src/Models/Guards/local.strategy';
import { Response } from 'express';
import { ApiResponse } from 'src/Models/Interface/response';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/Services/user/user.service';

@Controller('auth/api')
export class AuthController {

    constructor(private _authService: AuthService, private _userService: UserService){}

    @Post('/login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req, @Res() response: Response): Promise<any>{
        const _apiResponse = new ApiResponse();
    return this._authService.signIn(req.user).then(
        (data)=> {
            _apiResponse.data = data;
            _apiResponse.responseCode = "200";
            _apiResponse.responseDescription ="Successfully logged in"
            response.send(_apiResponse);
        },
        (err)=> {
            _apiResponse.data = err.message;
            _apiResponse.responseCode = err.statusCode;
            _apiResponse.responseDescription = err.error
            throw new HttpException(_apiResponse, 999)
        }
    );
    }


    // Section for Google authentication
    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        console.log("Google Authentication returned user1: ", req.user)
    }
  
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        console.log("Google Authentication returned user: ", req.user)
        // response.send(req)
      return this._authService.googleLogin(req);
        // return this._userService.createUserUsingGmail(req.user)
    }
}
