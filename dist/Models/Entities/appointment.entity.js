"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentEntity = void 0;
const typeorm_1 = require("typeorm");
const appointment_status_enum_1 = require("../Interface/appointment-status.enum");
const user_entity_1 = require("./user.entity");
let AppointmentEntity = class AppointmentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "appointment_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "appointment_description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "appointment_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "appointment_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: appointment_status_enum_1.AppointmentStatus, default: appointment_status_enum_1.AppointmentStatus.RUNNING }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: appointment_status_enum_1.Reminder, default: appointment_status_enum_1.Reminder.NOT_SENT }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "reminder", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "awasevalentine@gmail.com" }),
    __metadata("design:type", String)
], AppointmentEntity.prototype, "appointment_email", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "date_created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "date_updated", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], AppointmentEntity.prototype, "date_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, userAuthId => userAuthId.appointments),
    __metadata("design:type", user_entity_1.UserEntity)
], AppointmentEntity.prototype, "userAuthId", void 0);
AppointmentEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'appointments' })
], AppointmentEntity);
exports.AppointmentEntity = AppointmentEntity;
//# sourceMappingURL=appointment.entity.js.map