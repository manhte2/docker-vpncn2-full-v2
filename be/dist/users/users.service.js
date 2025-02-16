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
exports.UsersService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const users_schema_1 = require("../schemas/users.schema");
const mongoose_2 = require("@nestjs/mongoose");
const transactions_schema_1 = require("../schemas/transactions.schema");
const cashs_schema_1 = require("../schemas/cashs.schema");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nest-modules/mailer");
const utils_1 = require("../utils");
let UsersService = class UsersService {
    constructor(userModal, transactionModal, cashModal, configService, jwtService, mailerService) {
        this.userModal = userModal;
        this.transactionModal = transactionModal;
        this.cashModal = cashModal;
        this.configService = configService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async createDefaultAdmin() {
        try {
            const existAdmin = await this.userModal.findOne({
                email: this.configService.get('ADMIN_EMAIL'),
            });
            if (existAdmin)
                return;
            await this.userModal.create({
                email: this.configService.get('ADMIN_EMAIL'),
                password: this.configService.get('ADMIN_PASSWORD'),
                username: this.configService.get('ADMIN_USERNAME'),
                role: 1,
            });
        }
        catch (error) { }
    }
    async login(loginDto) {
        try {
            const existAccount = await this.userModal.findOne({
                $or: [
                    { email: loginDto.account, password: loginDto.password },
                    { username: loginDto.account, password: loginDto.password },
                ],
            });
            if (!existAccount)
                throw new common_1.BadRequestException({
                    message: 'Email / Username hoặc password không tồn tại',
                });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Đăng nhập thành công',
                data: existAccount,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async create(createUserDto) {
        try {
            const existUser = await this.userModal.findOne({
                $or: [
                    { email: createUserDto.email },
                    { username: createUserDto.username },
                ],
            });
            if (existUser)
                throw new common_1.BadRequestException({
                    message: 'Tài khoản hoặc email đã tồn tại',
                });
            let existIntroduceCode = {};
            if (createUserDto.introduceCode) {
                existIntroduceCode = await this.userModal.findOne({
                    introduceCode: createUserDto.introduceCode,
                });
                if (!existIntroduceCode) {
                    throw new common_1.BadRequestException({
                        message: 'Mã giới thiệu chưa chính xác',
                    });
                }
            }
            const userCreated = await this.userModal.create(Object.assign(Object.assign(Object.assign({}, createUserDto), (existIntroduceCode && { introduceUserId: existIntroduceCode === null || existIntroduceCode === void 0 ? void 0 : existIntroduceCode._id })), { introduceCode: (0, utils_1.generateRandomString)(7) }));
            const _a = userCreated.toObject(), { password } = _a, data = __rest(_a, ["password"]);
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Thêm mới user thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(req) {
        var _a, _b, _c, _d, _e, _f;
        try {
            let query = {};
            query = Object.assign(Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.level) && {
                level: { $in: (_b = req.query.level) === null || _b === void 0 ? void 0 : _b.split(',') },
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.email) && {
                email: { $regex: req.query.email, $options: 'i' },
            })), (((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.username) && {
                username: { $regex: req.query.username, $options: 'i' },
            })), (((_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.introduceCode) && {
                introduceCode: { $regex: req.query.introduceCode, $options: 'i' },
            }));
            const pageSize = req.query.pageSize || 10;
            const page = req.query.page || 1;
            const skip = Number(pageSize) * (page - 1);
            const take = Number(pageSize);
            const listUser = await this.userModal
                .find(query)
                .populate('introduceUserId')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(take);
            const totalItems = await this.userModal.find(query).count();
            const totalPage = Math.ceil(totalItems / Number(pageSize));
            const resultList = [];
            for (const user of listUser) {
                const transaction = await this.transactionModal.find({
                    userId: user._id,
                });
                const cash = await this.cashModal.aggregate([
                    {
                        $match: {
                            userId: new mongoose_1.default.Types.ObjectId(user._id),
                            status: 1,
                        },
                    },
                    { $group: { _id: user._id, money: { $sum: '$money' } } },
                ]);
                resultList.push(Object.assign(Object.assign({}, user.toObject()), { transaction: transaction === null || transaction === void 0 ? void 0 : transaction.length, cash: (_f = cash === null || cash === void 0 ? void 0 : cash[0]) === null || _f === void 0 ? void 0 : _f.money }));
            }
            return {
                currentPage: Number(page),
                totalPage,
                itemsPerPage: Number(take),
                totalItems,
                resultList,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            return await this.userModal.findById(id).populate('introduceUserId');
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(id, changePasswordDto) {
        try {
            const user = await this.userModal.findById(id);
            const isCorrectOldPassword = user.password === changePasswordDto.oldPassword;
            if (!isCorrectOldPassword) {
                throw new common_1.BadRequestException({
                    message: 'Mật khẩu cũ không chính xác',
                });
            }
            const data = await this.userModal.findByIdAndUpdate(user._id, {
                password: changePasswordDto.newPassword,
            }, { new: true });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Cập nhật mật khẩu thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async resetPassword(resetPasswordDto) {
        try {
            const decode = await this.jwtService.verify(resetPasswordDto.token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            await this.userModal.findByIdAndUpdate(decode._id, {
                password: resetPasswordDto.newPassword,
            });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Cập nhật mật khẩu thành công',
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Hết thời gian thay đổi mật khẩu hoặc token chưa chính xác');
        }
    }
    async forgotPassword(forgotPasswordDto) {
        try {
            const user = await this.userModal.findOne({
                email: forgotPasswordDto.email,
            });
            if (!user)
                throw new common_1.BadRequestException({
                    message: 'User không tồn tại',
                });
            const _a = user.toObject(), { password } = _a, data = __rest(_a, ["password"]);
            const token = await this.jwtService.signAsync(data, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: '5m',
            });
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'VPNCN2 Reset Password',
                text: `${this.configService.get('DOMAIN_WEB')}/reset-password?token=${token}`,
            });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Vui lòng vào mail click vào link để đổi mật khẩu. Hạn đổi mật khẩu là 5 phút kể từ lúc nhận email',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateUserDto) {
        try {
            const data = await this.userModal.findByIdAndUpdate(id, updateUserDto, {
                new: true,
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Cập nhật thông tin thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.userModal.deleteOne({ _id: id });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Xóa người dùng thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __param(1, (0, mongoose_2.InjectModel)(transactions_schema_1.Transaction.name)),
    __param(2, (0, mongoose_2.InjectModel)(cashs_schema_1.Cash.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        config_1.ConfigService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map