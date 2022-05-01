"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailsModule = void 0;
const appointment_service_1 = require("./../../Services/appointment/appointment.service");
const appointment_entity_1 = require("./../../Models/Entities/appointment.entity");
const user_entity_1 = require("./../../Models/Entities/user.entity");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const typeorm_1 = require("@nestjs/typeorm");
const mail_service_1 = require("../../Services/mail/mail.service");
const config_1 = require("@nestjs/config");
let MailsModule = class MailsModule {
};
MailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.MAIL_HOST,
                    service: process.env.MAIL_SERVICE,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply.com>',
                },
                template: {
                    dir: (0, path_1.join)(__dirname, '../../mail/'),
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, appointment_entity_1.AppointmentEntity]),
        ],
        providers: [mail_service_1.MailService, appointment_service_1.AppointmentService],
        exports: [mail_service_1.MailService]
    })
], MailsModule);
exports.MailsModule = MailsModule;
//# sourceMappingURL=mails.module.js.map