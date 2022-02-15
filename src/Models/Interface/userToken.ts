/* eslint-disable prettier/prettier */
export interface UserDetailsJwtToken {
  readonly name: string;
  readonly email: string;
  readonly account_type: string;
  readonly auth_id: number;
  readonly tokenExpirationTime?: number;
}
