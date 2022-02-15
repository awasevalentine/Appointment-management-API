"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.__esModule = true;
exports.AppointmentService = void 0;
/* eslint-disable prettier/prettier */
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var appointment_entity_1 = require("src/Models/Entities/appointment.entity");
var user_entity_1 = require("src/Models/Entities/user.entity");
var response_1 = require("src/Models/Interface/response");
var AppointmentService = /** @class */ (function () {
    function AppointmentService(_appointmentRepo, _userRepo) {
        this._appointmentRepo = _appointmentRepo;
        this._userRepo = _userRepo;
    }
    AppointmentService.prototype.createAppointment = function (payload) {
        return __awaiter(this, void 0, Promise, function () {
            var userAuthId, data, foundUser, password, result, newAppointment, saveAppointment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Inside ->", payload);
                        userAuthId = payload.userAuthId, data = __rest(payload, ["userAuthId"]);
                        console.log(userAuthId);
                        return [4 /*yield*/, this._userRepo.findOne({ where: { auth_id: userAuthId } })];
                    case 1:
                        foundUser = _a.sent();
                        password = foundUser.password, result = __rest(foundUser, ["password"]);
                        return [4 /*yield*/, this._appointmentRepo.create(__assign(__assign({}, data), { userAuthId: result }))];
                    case 2:
                        newAppointment = _a.sent();
                        console.log("Found User -> ", newAppointment);
                        return [4 /*yield*/, this._appointmentRepo.save(newAppointment)];
                    case 3:
                        saveAppointment = _a.sent();
                        if (saveAppointment) {
                            return [2 /*return*/, "Appointment created successfully"];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService.prototype.getAllAppointment = function (userId, paginationDto) {
        return __awaiter(this, void 0, Promise, function () {
            var skippedItems, totalCount, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        skippedItems = (paginationDto.page - 1) * paginationDto.limit;
                        return [4 /*yield*/, this._appointmentRepo.count()];
                    case 1:
                        totalCount = _a.sent();
                        return [4 /*yield*/, this._appointmentRepo.createQueryBuilder('appointments')
                                .leftJoinAndSelect('appointments.userAuthId', 'userAuthId')
                                .where("appointments.userAuthIdAuthId = :userAuthIdAuthId", { userAuthIdAuthId: userId })
                                .orderBy('date_created', "DESC")
                                .offset(skippedItems)
                                .limit(paginationDto.limit)
                                .getMany()];
                    case 2:
                        products = _a.sent();
                        return [2 /*return*/, {
                                totalCount: totalCount,
                                page: paginationDto.page,
                                limit: paginationDto.limit,
                                data: response_1.getAppointmentResponse(products)
                            }];
                }
            });
        });
    };
    AppointmentService.prototype.deleteAppointment = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var foundAppointment, deleteAppointment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._appointmentRepo.findOne({ where: { appointment_id: id } })];
                    case 1:
                        foundAppointment = _a.sent();
                        if (!!foundAppointment) return [3 /*break*/, 2];
                        throw new common_1.HttpException("Appointment with the following ID " + id + " wasn't found", common_1.HttpStatus.NOT_FOUND);
                    case 2: return [4 /*yield*/, this._appointmentRepo["delete"](id)];
                    case 3:
                        deleteAppointment = _a.sent();
                        if (deleteAppointment) {
                            return [2 /*return*/, 'Appointment was successfully deleted!'];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppointmentService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(appointment_entity_1.AppointmentEntity)),
        __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity))
    ], AppointmentService);
    return AppointmentService;
}());
exports.AppointmentService = AppointmentService;
