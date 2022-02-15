"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
/* eslint-disable prettier/prettier */
var typeorm_1 = require("typeorm");
var appointment_entity_1 = require("./appointment.entity");
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], UserEntity.prototype, "auth_id");
    __decorate([
        typeorm_1.Column()
    ], UserEntity.prototype, "email");
    __decorate([
        typeorm_1.Column()
    ], UserEntity.prototype, "fullName");
    __decorate([
        typeorm_1.Column()
    ], UserEntity.prototype, "account_type");
    __decorate([
        typeorm_1.Column()
    ], UserEntity.prototype, "password");
    __decorate([
        typeorm_1.OneToMany(function () { return appointment_entity_1.AppointmentEntity; }, function (appointments) { return appointments.userAuthId; })
    ], UserEntity.prototype, "appointments");
    UserEntity = __decorate([
        typeorm_1.Entity({ name: 'users' })
    ], UserEntity);
    return UserEntity;
}());
exports.UserEntity = UserEntity;
