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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../Models/Entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_dto_1 = require("../../Models/DTO/user.dto");
const auth_service_1 = require("../auth/auth.service");
let UserService = class UserService {
    constructor(userRepository, _authService) {
        this.userRepository = userRepository;
        this._authService = _authService;
    }
    async createUser(data) {
        const { email } = data;
        const foundUser = await this.userRepository.findOne({ where: { email: email } });
        if (foundUser) {
            throw new Error('User with the provided email already exist');
        }
        if (!foundUser) {
            const newUser = new user_entity_1.UserEntity();
            newUser.email = data.email;
            newUser.fullName = data.fullName;
            newUser.account_type = data.account_type;
            newUser.password = await bcrypt.hash(data.password, 10);
            const user = await this.userRepository.save(newUser);
            if (user) {
                return "Your account has been created sucessfully";
            }
        }
    }
    async createUserUsingGmail(userData) {
        const { email } = userData;
        const foundUser = await this.userRepository.findOne({ where: { email: email } });
        if (!foundUser) {
            const newUser = new user_entity_1.UserEntity();
            newUser.email = userData.email;
            newUser.fullName = userData.name;
            newUser.account_type = "Individual";
            const user = await this.userRepository.save(newUser);
            if (user) {
                const foundUser = await this.userRepository.findOne({ where: { email: email } });
                return this._authService.googleLogin(foundUser);
            }
        }
    }
    async getAllUsers() {
        return await this.userRepository.find().then((data) => {
            return data;
        }, (err) => {
            throw new Error(err);
        });
    }
    async getUserById(email) {
        const foundUser = await this.userRepository.findOne({ where: { email: email } });
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found for the given email');
        }
        return foundUser;
    }
    async updateUserdetails(userEmail, data) {
        const foundUser = await this.getUserById(userEmail).then();
    }
    async deleteUserById(userEmail) {
        const foundUser = await this.getUserById(userEmail).then();
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found for the given email');
        }
        await this.userRepository.delete(foundUser);
        return "Record successfully deleted!";
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map