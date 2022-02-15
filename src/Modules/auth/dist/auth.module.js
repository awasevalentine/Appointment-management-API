"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
/* eslint-disable prettier/prettier */
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var auth_controller_1 = require("src/Controllers/auth/auth.controller");
var google_strategy_1 = require("src/Models/Strategies/google.strategy");
var jwt_strategy_1 = require("src/Models/Strategies/jwt.strategy");
var local_strategy_1 = require("src/Models/Strategies/local.strategy");
var auth_service_1 = require("src/Services/auth/auth.service");
var user_service_1 = require("src/Services/user/user.service");
var user_module_1 = require("../user/user.module");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(),
                common_1.forwardRef(function () { return user_module_1.UserModule; }),
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                jwt_1.JwtModule.register({
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '10m' }
                }),
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, google_strategy_1.GoogleStrategy, jwt_strategy_1.JwtStrategy, user_service_1.UserService],
            exports: [auth_service_1.AuthService]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
