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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../Services/auth/auth.service");
const local_strategy_1 = require("../../Models/Guards/local.strategy");
const response_1 = require("../../Models/Interface/response");
const passport_1 = require("@nestjs/passport");
const user_service_1 = require("../../Services/user/user.service");
let AuthController = class AuthController {
    constructor(_authService, _userService) {
        this._authService = _authService;
        this._userService = _userService;
    }
    async login(req, response) {
        const _apiResponse = new response_1.ApiResponse();
        return this._authService.signIn(req.user).then((data) => {
            _apiResponse.data = data;
            _apiResponse.responseCode = "200";
            _apiResponse.responseDescription = "Successfully logged in";
            response.send(_apiResponse);
        }, (err) => {
            _apiResponse.data = err.message;
            _apiResponse.responseCode = err.statusCode;
            _apiResponse.responseDescription = err.error;
            throw new common_1.HttpException(_apiResponse, 999);
        });
    }
    async googleAuth(req) {
        console.log("Google Authentication returned user1: ", req.user);
    }
    googleAuthRedirect(req) {
        console.log("Google Authentication returned user: ", req.user);
        return this._authService.googleLogin(req);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)(local_strategy_1.LocalAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuthRedirect", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth/api'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map