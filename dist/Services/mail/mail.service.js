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
exports.MailService = void 0;
const appointment_entity_1 = require("../../Models/Entities/appointment.entity");
const appointment_service_1 = require("./../appointment/appointment.service");
const user_entity_1 = require("../../Models/Entities/user.entity");
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const appointmentMailDto_1 = require("../../Models/Interface/mail/appointmentMailDto");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const appointmentResult_interface_1 = require("../../Models/Interface/mail/appointmentResult.interface");
let MailService = class MailService {
    constructor(_appointmentService, _mailerService, _userRepo, _appointmentRepo, schedulerRegistery) {
        this._appointmentService = _appointmentService;
        this._mailerService = _mailerService;
        this._userRepo = _userRepo;
        this._appointmentRepo = _appointmentRepo;
        this.schedulerRegistery = schedulerRegistery;
        this.logger = new common_1.Logger(appointment_service_1.AppointmentService.name);
    }
    async sendConfirmation(payload) {
        await this._mailerService.sendMail({
            to: payload.sendTo,
            from: payload.sender,
            subject: payload.subject,
            html: `
        <html>
            <body>
                    <h1 style="text-align: center; "><b>${payload.title}</b></h1>
                    <p>${payload.content}</p>
            </body>
        </html>
      `,
        });
    }
    async findNameExist(payload) {
        const { appointment_email, name, title, appointment_description, userAuthId } = payload;
        const foundName = await this._userRepo.findOne({ fullName: name });
        console.log("Was found ", foundName);
        const msgSender = await this._userRepo.findOne({ auth_id: userAuthId });
        const emailPayload = { sender: msgSender.email, sendTo: appointment_email, title: title, subject: msgSender.fullName, content: appointment_description };
        if (appointment_email) {
            this.sendConfirmation(emailPayload).then((res) => {
                return { messageSendSuccess: 'Appointment notification sent' };
            });
        }
        if (!appointment_email) {
            const emailPayload2 = { sender: msgSender.email, sendTo: foundName.email, title: title, subject: msgSender.fullName, content: appointment_description };
            this.sendConfirmation(emailPayload2).then((res) => {
                return { messageSendSuccess: 'Appointment notification sent' };
            });
            if (!(appointment_email) && !(foundName)) {
                return { messageSendFail: `This user: ${name} does not exist on the system. '\n'
                    Please provide an Email address we can send message to
            ` };
            }
        }
    }
    eightAMReminder() {
        this.getSchedules().then((result) => {
            result.forEach((res) => {
                const { appointment_id, appointment_description, appointment_email, name, title, appointment_date, userAuthId: { auth_id } } = res;
                const payload = {
                    name: name,
                    title: title,
                    appointment_description: appointment_description,
                    appointment_email: appointment_email,
                    userAuthId: auth_id
                };
                const appointmentDate = new Date(appointment_date).toISOString().substring(0, 10);
                const timeNow = new Date().toISOString().substring(0, 10);
                if ((appointmentDate == timeNow) && res.reminder == 'no') {
                    this.findNameExist(payload).then((response) => {
                        if (response) {
                            this._appointmentService.updateReminder(appointment_id, res.reminder = 'yes').then((result) => {
                                this.logger.debug(result);
                            }, (err) => {
                                throw new Error(`For Error: ${err}`);
                            });
                        }
                    });
                }
            });
        });
    }
    async getSchedules() {
        return await this._appointmentService.getAllAppointmentForCronJob().then((res) => {
            return res;
        }, (err) => {
            this.logger.debug(err.message);
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(' * * 8 * * * ', {
        name: '_8AmReminder'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MailService.prototype, "eightAMReminder", null);
MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(3, (0, typeorm_2.InjectRepository)(appointment_entity_1.AppointmentEntity)),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService,
        mailer_1.MailerService,
        typeorm_1.Repository,
        typeorm_1.Repository,
        schedule_1.SchedulerRegistry])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map