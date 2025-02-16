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
exports.CashsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cashs_schema_1 = require("../schemas/cashs.schema");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../schemas/users.schema");
const moment = require("moment");
const utils_1 = require("../utils");
let CashsService = class CashsService {
    constructor(cashModal, userModal) {
        this.cashModal = cashModal;
        this.userModal = userModal;
    }
    async autoBank(createCashDto) {
        try {
            const code = `${moment().format('YYYYMMDD')}-${(0, utils_1.generateRandomString)(4).toLowerCase()}`;
            await this.cashModal.create(Object.assign(Object.assign({}, createCashDto), { code, status: 1 }));
            await this.userModal.findByIdAndUpdate(createCashDto.userId, {
                $inc: { money: createCashDto.money },
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Nạp tiền thành công.',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async create(createCashDto) {
        try {
            const code = `${moment().format('YYYYMMDD')}-${(0, utils_1.generateRandomString)(4).toLowerCase()}`;
            const data = await this.cashModal.create(Object.assign(Object.assign({}, createCashDto), { code }));
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Nạp tiền thành công. Vui lòng chờ admin phê duyệt',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async cashByAdmin(cashByAdminDto) {
        try {
            const code = `${moment().format('YYYYMMDD')}-${(0, utils_1.generateRandomString)(4).toLowerCase()}`;
            const data = await this.cashModal.create(Object.assign(Object.assign({}, cashByAdminDto), { code, status: 1, type: 1, createByAdmin: 1 }));
            await this.userModal.findByIdAndUpdate(cashByAdminDto.userId, {
                $inc: { money: cashByAdminDto.money },
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Nạp tiền thành công.',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(req) {
        var _a, _b, _c;
        try {
            let query = {};
            query = Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId) && {
                userId: req.query.userId,
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.status) && {
                status: req.query.status,
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.code) && {
                code: { $regex: req.query.code, $options: 'i' },
            }));
            return await this.cashModal
                .find(query)
                .sort({ createdAt: -1 })
                .populate('userId');
        }
        catch (error) {
            throw error;
        }
    }
    async approve(id) {
        try {
            const cash = await this.cashModal.findOne({ _id: id });
            if (cash.status !== 2)
                throw new common_1.BadRequestException({
                    message: 'Hóa đơn đã được phê duyệt hoặc từ chối',
                });
            await this.cashModal.findByIdAndUpdate(cash._id, { status: 1 });
            await this.userModal.findByIdAndUpdate(cash.userId, {
                $inc: { money: cash.money },
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Phê duyệt hóa đơn thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async reject(id, rejectCashDto) {
        try {
            const cash = await this.cashModal.findOne({ _id: id });
            if (cash.status !== 2)
                throw new common_1.BadRequestException({
                    message: 'Hóa đơn đã được phê duyệt hoặc từ chối',
                });
            await this.cashModal.findByIdAndUpdate(cash._id, Object.assign({ status: 0 }, rejectCashDto));
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Hóa đơn đã bị từ chối',
            };
        }
        catch (error) {
            throw error;
        }
    }
    remove(id) {
        return `This action removes a #${id} cash`;
    }
};
CashsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cashs_schema_1.Cash.name)),
    __param(1, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CashsService);
exports.CashsService = CashsService;
//# sourceMappingURL=cashs.service.js.map