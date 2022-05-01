import { Strategy } from 'passport-jwt';
import { UserDetailsJwtToken } from '../Interface/userToken';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserDetailsJwtToken): Promise<{
        email: string;
        name: string;
        account_type: string;
        userId: number;
    }>;
}
export {};
