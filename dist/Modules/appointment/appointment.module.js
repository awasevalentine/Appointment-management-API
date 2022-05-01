"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentModule = void 0;
const mail_service_1 = require("../../Services/mail/mail.service");
const common_1 = require("@nestjs/common");
const appointment_entity_1 = require("../../Models/Entities/appointment.entity");
const user_entity_1 = require("../../Models/Entities/user.entity");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_service_1 = require("../../Services/appointment/appointment.service");
const appointment_controller_1 = require("../../Controllers/appointment/appointment.controller");
let AppointmentModule = class AppointmentModule {
};
AppointmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([appointment_entity_1.AppointmentEntity, user_entity_1.UserEntity]),
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [appointment_controller_1.AppointmentController],
        providers: [appointment_service_1.AppointmentService],
        exports: [appointment_service_1.AppointmentService],
    })
], AppointmentModule);
exports.AppointmentModule = AppointmentModule;
//# sourceMappingURL=appointment.module.js.map