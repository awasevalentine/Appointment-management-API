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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("../../Models/DTO/user.dto");
const jwt_strategy_1 = require("../../Models/Guards/jwt.strategy");
const response_1 = require("../../Models/Interface/response");
const user_service_1 = require("../../Services/user/user.service");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    async createUser(userData, response) {
        let _apiResponse = new response_1.ApiResponse();
        return this._userService.createUser(userData).then((data) => {
            _apiResponse.data = data;
            _apiResponse.responseCode = "200";
            response.send(_apiResponse);
        }, (err) => {
            _apiResponse.data = err.message;
            _apiResponse.responseCode = err.statusCode;
            _apiResponse.responseDescription = err.error;
            throw new common_1.HttpException(_apiResponse, 409);
        });
    }
    getAllUsers(response) {
        let _apiResponse = new response_1.ApiResponse();
        return this._userService.getAllUsers().then((data) => {
            const { password } = data, result = __rest(data, ["password"]);
            _apiResponse.data = result;
            _apiResponse.responseCode = "200";
            response.send(_apiResponse);
        }, (err) => {
            _apiResponse.data = err.message;
            _apiResponse.responseCode = err.statusCode;
            _apiResponse.responseDescription = err.error;
            throw new common_1.HttpException(_apiResponse, 999);
        });
    }
    getUserById(userEmail, response) {
        let _apiResponse = new response_1.ApiResponse();
        return this._userService.getUserById(userEmail).then((data) => {
            const { password } = data, result = __rest(data, ["password"]);
            _apiResponse.data = result;
            _apiResponse.responseCode = "200";
            response.send(_apiResponse);
        }, (err) => {
            _apiResponse.data = err.message;
            _apiResponse.responseCode = err.statusCode;
            _apiResponse.responseDescription = err.error;
            throw new common_1.HttpException(_apiResponse, 999);
        });
    }
    deleteUserByEmail(userEmail, response) {
        let _apiResponse = new response_1.ApiResponse();
        return this._userService.deleteUserById(userEmail).then((data) => {
            _apiResponse.data = data;
            _apiResponse.responseCode = "200";
            response.send(_apiResponse);
        }, (err) => {
            _apiResponse.data = err.message;
            _apiResponse.responseCode = err.statusCode;
            _apiResponse.responseDescription = err.error;
            throw new common_1.HttpException(_apiResponse, 999);
        });
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/users'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/user/:userEmail'),
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("userEmail")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Delete)('user/:userEmail'),
    (0, common_1.UseGuards)(jwt_strategy_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("userEmail")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUserByEmail", null);
UserController = __decorate([
    (0, common_1.Controller)('user/api'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map