/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';


config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback,): Promise<any> {
    const { emails, photos, displayName, provider } = profile;
    const user = {
      email: emails[0].value,
      name: displayName,
    //   firstName: name.givenName,
    //   lastName: name.familyName,
      picture: photos[0].value,
      provider: provider,
      accessToken,
    };
    done(null, user);
  }
}
