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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const userToken_1 = require("../../Models/Interface/userToken");
let AuthService = class AuthService {
    constructor(_userService, jwtService) {
        this._userService = _userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this._userService.getUserById(email);
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return await bcrypt.compare(pass, user.password).then((validUser) => {
            if (validUser) {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
            else {
                return null;
            }
        }, (err) => {
            throw new Error(err);
        });
    }
    async signIn(user) {
        const payload = {
            email: user.email,
            name: user.name,
            userId: user.auth_id,
            account_type: user.account_type,
        };
        return this.jwtService.sign(payload);
    }
    async googleLogin(req) {
        if (!req.user) {
            return 'No user from google';
        }
        return {
            message: 'User Info from Google',
            user: req.user,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map