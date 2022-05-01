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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var AppointmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const appointment_dto_1 = require("../../Models/DTO/appointment.dto");
const appointment_entity_1 = require("../../Models/Entities/appointment.entity");
const user_entity_1 = require("../../Models/Entities/user.entity");
const response_1 = require("../../Models/Interface/response");
const typeorm_1 = require("typeorm");
const appointment_dto_2 = require("../../Models/Paginate/appointment.dto");
const appointment_result_dto_1 = require("../../Models/Paginate/appointment.result.dto");
const appointment_status_enum_1 = require("../../Models/Interface/appointment-status.enum");
const schedule_1 = require("@nestjs/schedule");
const typeorm_2 = require("@nestjs/typeorm");
let AppointmentService = AppointmentService_1 = class AppointmentService {
    constructor(_appointmentRepo, _userRepo, schedulerRegistry) {
        this._appointmentRepo = _appointmentRepo;
        this._userRepo = _userRepo;
        this.schedulerRegistry = schedulerRegistry;
        this.logger = new common_1.Logger(AppointmentService_1.name);
    }
    async createAppointment(payload) {
        const { userAuthId } = payload, data = __rest(payload, ["userAuthId"]);
        const foundUser = await this._userRepo.findOne({ where: { auth_id: userAuthId } });
        const { password } = foundUser, result = __rest(foundUser, ["password"]);
        data.date_created = new Date();
        const newAppointment = await this._appointmentRepo.create(Object.assign(Object.assign({}, data), { userAuthId: result }));
        const saveAppointment = await this._appointmentRepo.save(newAppointment);
        if (saveAppointment) {
            return `Appointment created successfully`;
        }
        return;
    }
    async getAllAppointmentForCronJob() {
        const resp = await this._appointmentRepo.createQueryBuilder("appointments")
            .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
            .getMany();
        return resp;
    }
    async getAllRunningAppointment(userId, paginationDto) {
        const skippedItems = (paginationDto.page) * paginationDto.limit;
        let totalCountRunning = 0;
        await this._appointmentRepo.createQueryBuilder("appointments")
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .where("status = 'running'")
            .getCount().then((res) => {
            totalCountRunning = res;
        }, (err) => {
            throw new common_1.HttpException(err.message, err.statusCode);
        });
        const products = await this._appointmentRepo.createQueryBuilder('appointments')
            .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .andWhere("status = 'running'")
            .skip(skippedItems)
            .take(paginationDto.limit)
            .getMany();
        return {
            totalCount: totalCountRunning,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: (0, response_1.getAppointmentResponse)(await products),
        };
    }
    async getAllCancelledAppointment(userId, paginationDto) {
        const skippedItems = (paginationDto.page) * paginationDto.limit;
        let totalCountRunning = 0;
        await this._appointmentRepo.createQueryBuilder("appointments")
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .where("status = 'cancel'")
            .getCount().then((res) => {
            totalCountRunning = res;
        }, (err) => {
            throw new common_1.HttpException(err.message, err.statusCode);
        });
        const products = await this._appointmentRepo.createQueryBuilder('appointments')
            .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .andWhere("status = 'cancel'")
            .skip(skippedItems)
            .take(paginationDto.limit)
            .getMany();
        return {
            totalCount: totalCountRunning,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: (0, response_1.getAppointmentResponse)(await products),
        };
    }
    async getAllCompletedAppointment(userId, paginationDto) {
        const skippedItems = (paginationDto.page) * paginationDto.limit;
        let totalCountRunning = 0;
        await this._appointmentRepo.createQueryBuilder("appointments")
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .where("status = 'complete'")
            .getCount().then((res) => {
            totalCountRunning = res;
        }, (err) => {
            throw new common_1.HttpException(err.message, err.statusCode);
        });
        const products = await this._appointmentRepo.createQueryBuilder('appointments')
            .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .andWhere("status = 'complete'")
            .skip(skippedItems)
            .take(paginationDto.limit)
            .getMany();
        return {
            totalCount: totalCountRunning,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: (0, response_1.getAppointmentResponse)(await products),
        };
    }
    async updateAppointment(id, payload) {
        const { userAuthId, } = payload;
        const foundUser = await this._userRepo.findOne({ where: { auth_id: userAuthId } });
        const foundAppointment = await this._appointmentRepo.findOne({ where: { appointment_id: id } });
        if (!foundUser) {
            throw new common_1.HttpException("User with the provided AuthId not found", common_1.HttpStatus.NOT_FOUND);
        }
        if (!foundAppointment) {
            throw new common_1.HttpException(`appointment with the given ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            foundAppointment.title = payload.title;
            foundAppointment.appointment_description = payload.appointment_description;
            foundAppointment.name = payload.name;
            foundAppointment.appointment_date = payload.appointment_date;
            foundAppointment.appointment_time = payload.appointment_time;
            foundAppointment.status = payload.status;
            foundAppointment.date_updated = new Date();
            const saveUpdate = await this._appointmentRepo.update(id, foundAppointment);
            if (saveUpdate) {
                return "Appointment successfully updated!";
            }
        }
    }
    async updateReminder(id, payload) {
        const foundAppointment = await this._appointmentRepo.findOne({ where: { appointment_id: id } });
        if (!foundAppointment) {
            throw new common_1.HttpException(`Appointment with id ${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        foundAppointment.reminder = payload;
        const saveAppointment = await this._appointmentRepo.update(id, foundAppointment);
        if (saveAppointment) {
            return 'Reminder sent and data updated.';
        }
    }
    async deleteAppointment(id) {
        const foundAppointment = await this._appointmentRepo.findOne({ where: { appointment_id: id } });
        if (!foundAppointment) {
            throw new common_1.HttpException(`Appointment with the following ID ${id} wasn't found`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            const deleteAppointment = await this._appointmentRepo.delete(id);
            if (deleteAppointment) {
                return 'Appointment was successfully deleted!';
            }
        }
    }
    async cancelAppointment(id) {
        const foundAppointment = await this._appointmentRepo.findOne({ where: { appointment_id: id } });
        if (!foundAppointment) {
            throw new common_1.HttpException(`Appointment with the following ID ${id} wasn't found`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            foundAppointment.status = appointment_status_enum_1.AppointmentStatus.CANCEL;
            const cancelAppointment = await this._appointmentRepo.save(foundAppointment);
            if (cancelAppointment) {
                return 'Appointment was successfully Canceled!';
            }
        }
    }
    async markAsCompleteAppointment(id) {
        const foundAppointment = await this._appointmentRepo.findOne({ where: { appointment_id: id } });
        if (!foundAppointment) {
            throw new common_1.HttpException(`Appointment with the following ID ${id} wasn't found`, common_1.HttpStatus.NOT_FOUND);
        }
        else {
            foundAppointment.status = appointment_status_enum_1.AppointmentStatus.COMPLETE;
            const markAsComplete = await this._appointmentRepo.save(foundAppointment);
            if (markAsComplete) {
                return 'Appointment is successfully Completed!';
            }
        }
    }
    async getAllAppointmentCount(userId) {
        const totalCount = {
            runningCount: 0,
            cancelledCount: 0,
            completedCount: 0
        };
        await this._appointmentRepo.createQueryBuilder("appointments")
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .andWhere("status = 'running'")
            .getCount().then((res) => {
            return totalCount.runningCount = res;
        }, (err) => {
            throw new common_1.HttpException(err.message, err.statusCode);
        });
        await this._appointmentRepo.createQueryBuilder("appointments")
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .where("status = 'cancel'")
            .getCount().then((res) => {
            totalCount.cancelledCount = res;
        }, (err) => {
            throw new common_1.HttpException(err.message, err.statusCode);
        });
        await this._appointmentRepo.createQueryBuilder("appointments")
            .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
            .where("status = 'completed'")
            .getCount().then((res) => {
            totalCount.completedCount = res;
        }, (err) => {
            throw new common_1.HttpException(err.message, err.statusCode);
        });
        return totalCount;
    }
};
AppointmentService = AppointmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(appointment_entity_1.AppointmentEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        schedule_1.SchedulerRegistry])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map