"use strict";
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
exports.__esModule = true;
exports.UserService = void 0;
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var user_entity_1 = require("src/Models/Entities/user.entity");
var bcrypt = require("bcrypt");
var auth_service_1 = require("../auth/auth.service");
// import { AuthService } from '../auth/auth.service';
var UserService = /** @class */ (function () {
    function UserService(userRepository, _authService) {
        this.userRepository = userRepository;
        this._authService = _authService;
    }
    //Method for creating a user
    UserService.prototype.createUser = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var email, foundUser, newUser, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = data.email;
                        return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 1:
                        foundUser = _b.sent();
                        if (foundUser) {
                            throw new Error('User with the provided email already exist');
                        }
                        if (!!foundUser) return [3 /*break*/, 4];
                        newUser = new user_entity_1.UserEntity();
                        newUser.email = data.email;
                        newUser.fullName = data.fullName;
                        newUser.account_type = data.account_type;
                        _a = newUser;
                        return [4 /*yield*/, bcrypt.hash(data.password, 10)];
                    case 2:
                        _a.password = _b.sent();
                        return [4 /*yield*/, this.userRepository.save(newUser)];
                    case 3:
                        user = _b.sent();
                        if (user) {
                            return [2 /*return*/, "Your account has been created sucessfully"];
                        }
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.createUserUsingGmail = function (userData) {
        return __awaiter(this, void 0, Promise, function () {
            var email, foundUser, newUser, user, foundUser_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = userData.email;
                        return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 1:
                        foundUser = _a.sent();
                        if (!!foundUser) return [3 /*break*/, 4];
                        newUser = new user_entity_1.UserEntity();
                        newUser.email = userData.email;
                        newUser.fullName = userData.name;
                        newUser.account_type = "Individual";
                        return [4 /*yield*/, this.userRepository.save(newUser)];
                    case 2:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 3:
                        foundUser_1 = _a.sent();
                        return [2 /*return*/, this._authService.googleLogin(foundUser_1)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Method for getting all users
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.find().then(function (data) {
                            return data;
                        }, function (err) {
                            throw new Error(err);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Method for getting a single user
    UserService.prototype.getUserById = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ where: { email: email } })];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new common_1.NotFoundException('User not found for the given email');
                        }
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    UserService.prototype.updateUserdetails = function (userEmail, data) {
        return __awaiter(this, void 0, Promise, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(userEmail).then()];
                    case 1:
                        foundUser = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUserById = function (userEmail) {
        return __awaiter(this, void 0, Promise, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserById(userEmail).then()];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new common_1.NotFoundException('User not found for the given email');
                        }
                        return [4 /*yield*/, this.userRepository["delete"](foundUser)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "Record successfully deleted!"];
                }
            });
        });
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
        __param(1, common_1.Inject(common_1.forwardRef(function () { return auth_service_1.AuthService; })))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
