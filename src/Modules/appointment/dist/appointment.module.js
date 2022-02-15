"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var appointment_controller_1 = require("src/controllers/appointment/appointment.controller");
var appointment_entity_1 = require("src/Models/Entities/appointment.entity");
var user_entity_1 = require("src/Models/Entities/user.entity");
var appointment_service_1 = require("src/services/appointment/appointment.service");
var AppointmentModule = /** @class */ (function () {
    function AppointmentModule() {
    }
    AppointmentModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([appointment_entity_1.AppointmentEntity, user_entity_1.UserEntity])],
            controllers: [appointment_controller_1.AppointmentController],
            providers: [appointment_service_1.AppointmentService]
        })
    ], AppointmentModule);
    return AppointmentModule;
}());
exports.AppointmentModule = AppointmentModule;