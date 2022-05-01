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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const appointment_dto_1 = require("../../Models/DTO/appointment.dto");
const jwt_strategy_1 = require("../../Models/Guards/jwt.strategy");
const response_1 = require("../../Models/Interface/response");
const appointment_dto_2 = require("../../Models/Paginate/appointment.dto");
const appointment_result_dto_1 = require("../../Models/Paginate/appointment.result.dto");
const appointment_service_1 = require("../../Services/appointment/appointment.service");
let AppointmentController = class AppointmentController {
    constructor(_appointmentService) {
        this._appointmentService = _appointmentService;
    }
    async createAppointment(payload, response) {
        const _response = new response_1.ApiResponse();
        return this._appointmentService.createAppointment(payload).then((data) => {
            _response.data = data;
            _response.responseCode = "200";
            _response.responseDescription = 'Appointment creation';
            response.send(_response);
        }, (error) => {
            _response.data = error;
            _response.responseCode = error.statusCode;
            _response.responseDescription;
            throw new common_1.HttpException(_response, error.statusCode);
        });
    }
    getAllRunningAppointment(paginationDto) {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);
        const userId = paginationDto.userId;
        return this._appointmentService.getAllRunningAppointment(userId, Object.assign(Object.assign({}, paginationDto), { limit: paginationDto.limit > 100 ? 100 : paginationDto.limit }));
    }
    getAllCancelledAppointment(paginationDto) {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);
        const userId = paginationDto.userId;
        return this._appointmentService.getAllCancelledAppointment(userId, Object.assign(Object.assign({}, paginationDto), { limit: paginationDto.limit > 100 ? 100 : paginationDto.limit }));
    }
    getAllCompletedAppointment(paginationDto) {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);
        const userId = paginationDto.userId;
        return this._appointmentService.getAllCompletedAppointment(userId, Object.assign(Object.assign({}, paginationDto), { limit: paginationDto.limit > 100 ? 100 : paginationDto.limit }));
    }
    updateAppointment(id, appointmentUpdateDetails, response) {
        const _response = new response_1.ApiResponse();
        return this._appointmentService.updateAppointment(id, appointmentUpdateDetails).then((res) => {
            console.log("Data ", res);
            _response.data = res;
            _response.responseCode = "200";
            _response.responseDescription = 'Appointment successfully updated';
            response.send(_response);
        }, (error) => {
            console.log("Data ", error);
            _response.data = error.message;
            _response.responseCode = error.statuCode;
            response.send(_response);
        });
    }
    cancelAppointment(id, data, response) {
        const _responseMsg = new response_1.ApiResponse();
        return this._appointmentService.cancelAppointment(id).then((data) => {
            _responseMsg.data = data;
            _responseMsg.responseCode = "200";
            _responseMsg.responseDescription = "Successful";
            response.send(_responseMsg);
        }, (error) => {
            _responseMsg.data = error.message;
            _responseMsg.responseCode = error.statuscode;
            response.send(_responseMsg);
        });
    }
    markAsCompleteAppointment(id, data, response) {
        const _responseMsg = new response_1.ApiResponse();
        return this._appointmentService.markAsCompleteAppointment(id).then((data) => {
            _responseMsg.data = data;
            _responseMsg.responseCode = "200";
            _responseMsg.responseDescription = "Successfull";
            response.send(_responseMsg);
        }, (error) => {
            _responseMsg.data = error.message;
            _responseMsg.responseCode = error.statuscode;
            response.send(_responseMsg);
        });
    }
    deleteAppointment(id, response) {
        const _responseMsg = new response_1.ApiResponse();
        return this._appointmentService.deleteAppointment(id).then((data) => {
            _responseMsg.data = data;
            _responseMsg.responseCode = "200";
            _responseMsg.responseDescription = "Successful";
            response.send(_responseMsg);
        }, (error) => {
            _responseMsg.data = error.message;
            _responseMsg.responseCode = error.statuscode;
            response.send(_responseMsg);
        });
    }
    getAppointmentCount(response, userId) {
        const _responseMsg = new response_1.ApiResponse();
        return this._appointmentService.getAllAppointmentCount(userId).then((data) => {
            _responseMsg.data = data;
            _responseMsg.responseCode = "200";
            _responseMsg.responseDescription = "Appointment Total counts";
            console.log(data);
            response.send(_responseMsg);
        }, (error) => {
            _responseMsg.data = error.message;
            _responseMsg.responseCode = error.statuscode;
            response.send(_responseMsg);
        });
    }
    async sendMail(response) {
        const sender = "valentinebassey02@gmail.com";
        const sendTo = "awasevalentine@gmail.com";
        const subject = "Testing";
        const title = " First test";
        const content = "Okay";
        const payload = { sender, sendTo, subject, title, content };
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Get)('/all-running/appointments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAllRunningAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Get)('/all-cancelled/appointments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAllCancelledAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Get)('/all-completed/appointments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [appointment_dto_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAllCompletedAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Put)('/update_appointment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "updateAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Put)('/cancel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "cancelAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Put)('/markcomplete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "markAsCompleteAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "deleteAppointment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    (0, common_1.Get)('/total_counts/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "getAppointmentCount", null);
__decorate([
    (0, common_1.Post)('/mail'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentController.prototype, "sendMail", null);
AppointmentController = __decorate([
    (0, common_1.Controller)('appointment/api'),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
exports.AppointmentController = AppointmentController;
function appointmentMailDto(payload, appointmentMailDto) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=appointment.controller.js.map