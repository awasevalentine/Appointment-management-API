/* eslint-disable prettier/prettier */
export interface UserRegistrationDto {
  readonly fullName: string;
  readonly email: string;
  readonly password: string;
  readonly account_type?: string;
  provider?: string;
}

export interface GmailUserRegistrationDto {
  readonly name: string;
  readonly email: string;
  readonly password?: string;
  readonly provider?: string;
  readonly account_type?: string;
}

export class UserLoginDto {
  email: string;
  password: string;
}
