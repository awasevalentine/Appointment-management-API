"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppointmentEntity = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./user.entity");
var AppointmentEntity = /** @class */ (function () {
    function AppointmentEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], AppointmentEntity.prototype, "appointment_id");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "appointment_description");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "appointment_date");
    __decorate([
        typeorm_1.Column()
    ], AppointmentEntity.prototype, "appointment_time");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], AppointmentEntity.prototype, "date_created");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], AppointmentEntity.prototype, "date_updated");
    __decorate([
        typeorm_1.DeleteDateColumn()
    ], AppointmentEntity.prototype, "date_deleted");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.UserEntity; }, function (userAuthId) { return userAuthId.appointments; })
    ], AppointmentEntity.prototype, "userAuthId");
    AppointmentEntity = __decorate([
        typeorm_1.Entity({ name: 'appointments' })
    ], AppointmentEntity);
    return AppointmentEntity;
}());
exports.AppointmentEntity = AppointmentEntity;
