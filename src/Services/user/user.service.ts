/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/Models/Entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { GmailUserRegistrationDto, UserRegistrationDto } from 'src/Models/DTO/user.dto';
import { AuthService } from '../auth/auth.service';
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))private _authService: AuthService
  ) {}

  //Method for creating a user
  async createUser(data: UserRegistrationDto): Promise<string> {
    const { email } = data;
    const foundUser = await this.userRepository.findOne({ where: { email: email }});
    if (foundUser) {
      throw new Error('User with the provided email already exist');
    }
    if (!foundUser) {
      const newUser = new UserEntity();
      newUser.email = data.email;
      newUser.fullName = data.fullName;
      newUser.account_type = data.account_type;
      newUser.password = await bcrypt.hash(data.password, 10);
      const user = await this.userRepository.save(newUser);
      if (user) {
        return "Your account has been created sucessfully";
      }
    } 
  }


  async createUserUsingGmail(userData: GmailUserRegistrationDto):Promise<any>{
    const { email } = userData;
    const foundUser = await this.userRepository.findOne({ where: { email: email }});
    // if (foundUser && foundUser.provider ==='google') {
    //   await this._authService.googleLogin(foundUser)
    // }
    if (!foundUser) {
      const newUser = new UserEntity();
      newUser.email = userData.email;
      newUser.fullName = userData.name;
      newUser.account_type = "Individual";
      // newUser.provider = userData.provider
      const user = await this.userRepository.save(newUser);
      if (user) {
        const foundUser = await this.userRepository.findOne({ where: { email: email }});
        return this._authService.googleLogin(foundUser)
      }
    }
  }

  //Method for getting all users
  async getAllUsers(): Promise<any> {
    return await this.userRepository.find().then(
      (data) => {
        return data;
      },
      (err) => {
        throw new Error(err);
      },
    );
  }

  //Method for getting a single user
  async getUserById(email: any): Promise<UserEntity> {
    const foundUser = await this.userRepository.findOne({ where: { email: email }});
    if (!foundUser) {
      throw new NotFoundException('User not found for the given email');
    }
    return foundUser;
  }

  async updateUserdetails(userEmail: string, data: any): Promise<any> {
    const foundUser = await this.getUserById(userEmail).then();
    // foundUser.m
  }

  async deleteUserById(userEmail: string): Promise<string> {
    const foundUser = await this.getUserById(userEmail).then();
    if (!foundUser) {
      throw new NotFoundException('User not found for the given email');

    }
     await this.userRepository.delete(foundUser);
     return "Record successfully deleted!";
  }
}
