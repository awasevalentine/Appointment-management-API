import { UserEntity } from 'src/Models/Entities/user.entity';
import { Repository } from 'typeorm';
import { GmailUserRegistrationDto, UserRegistrationDto } from 'src/Models/DTO/user.dto';
import { AuthService } from '../auth/auth.service';
export declare class UserService {
    private userRepository;
    private _authService;
    constructor(userRepository: Repository<UserEntity>, _authService: AuthService);
    createUser(data: UserRegistrationDto): Promise<string>;
    createUserUsingGmail(userData: GmailUserRegistrationDto): Promise<any>;
    getAllUsers(): Promise<any>;
    getUserById(email: any): Promise<UserEntity>;
    updateUserdetails(userEmail: string, data: any): Promise<any>;
    deleteUserById(userEmail: string): Promise<string>;
}
