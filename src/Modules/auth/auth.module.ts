/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/Controllers/auth/auth.controller';
import { GoogleStrategy } from 'src/Models/Strategies/google.strategy';
import { JwtStrategy } from 'src/Models/Strategies/jwt.strategy';
import { LocalStrategy } from 'src/Models/Strategies/local.strategy';
import { AuthService } from 'src/Services/auth/auth.service';
import { UserService } from 'src/Services/user/user.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule), PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60m' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy,GoogleStrategy, JwtStrategy,UserService],
    exports: [AuthService]
})
export class AuthModule {}
