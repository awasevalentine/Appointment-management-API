import { AuthService } from 'src/Services/auth/auth.service';
import { Response } from 'express';
import { UserService } from 'src/Services/user/user.service';
export declare class AuthController {
    private _authService;
    private _userService;
    constructor(_authService: AuthService, _userService: UserService);
    login(req: any, response: Response): Promise<any>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<any>;
}
