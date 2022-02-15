"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var user_module_1 = require("./modules/user/user.module");
var auth_module_1 = require("./modules/auth/auth.module");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("./Models/Entities/user.entity");
var appointment_module_1 = require("./modules/appointment/appointment.module");
var appointment_entity_1 = require("./Models/Entities/appointment.entity");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.MYSQL_HOST,
                    port: 3306,
                    username: process.env.MYSQL_USERNAME,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE,
                    entities: [user_entity_1.UserEntity, appointment_entity_1.AppointmentEntity],
                    synchronize: false
                }),
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                appointment_module_1.AppointmentModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
