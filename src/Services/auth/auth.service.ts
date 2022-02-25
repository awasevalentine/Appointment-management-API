import { MailService } from './../mail/mail.service';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDetailsJwtToken } from 'src/Models/Interface/userToken';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private _userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, pass): Promise<any> {
    const user = await this._userService.getUserById(email);
    if (!user) {
      throw new NotFoundException();
    }
    return await bcrypt.compare(pass, user.password).then(
      (validUser) => {
        if (validUser) {
          const { password, ...result } = user;
          return result;
        } else {
          return null;
        }
      },
      (err) => {
        throw new Error(err);
      },
    );
    // return valid;
  }

  async signIn(user: UserDetailsJwtToken): Promise<any> {
    const payload = {
      email: user.email,
      name: user.name,
      userId: user.auth_id,
      account_type: user.account_type,
    };
    return this.jwtService.sign(payload);
  }

  //Section for google login

  async googleLogin(req): Promise<any> {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }
}
