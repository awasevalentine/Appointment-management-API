import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDetailsJwtToken } from 'src/Models/Interface/userToken';
export declare class AuthService {
    private _userService;
    private jwtService;
    constructor(_userService: UserService, jwtService: JwtService);
    validateUser(email: any, pass: any): Promise<any>;
    signIn(user: UserDetailsJwtToken): Promise<any>;
    googleLogin(req: any): Promise<any>;
}
