import { Response } from 'express';
import { UserRegistrationDto } from 'src/Models/DTO/user.dto';
import { UserService } from 'src/Services/user/user.service';
export declare class UserController {
    private _userService;
    constructor(_userService: UserService);
    createUser(userData: UserRegistrationDto, response: Response): Promise<any>;
    getAllUsers(response: Response): Promise<void>;
    getUserById(userEmail: string, response: Response): Promise<void>;
    deleteUserByEmail(userEmail: string, response: Response): Promise<void>;
}
