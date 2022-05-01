"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const appointment_module_1 = require("./Modules/appointment/appointment.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./Models/Entities/user.entity");
const appointment_entity_1 = require("./Models/Entities/appointment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const mails_module_1 = require("./Modules/mails/mails.module");
const user_module_1 = require("./Modules/user/user.module");
const auth_module_1 = require("./Modules/auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['env.dev', 'env.prod'],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'remotemysql.com',
                port: 3306,
                username: 'dVHpw0whju',
                password: 'GhzMoVXfeh',
                database: 'dVHpw0whju',
                entities: [user_entity_1.UserEntity, appointment_entity_1.AppointmentEntity],
                synchronize: true,
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            appointment_module_1.AppointmentModule,
            mails_module_1.MailsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map