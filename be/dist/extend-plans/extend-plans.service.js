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
exports.ExtendPlansService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const extendPlans_schema_1 = require("../schemas/extendPlans.schema");
const mongoose_2 = require("mongoose");
const transactions_schema_1 = require("../schemas/transactions.schema");
let ExtendPlansService = class ExtendPlansService {
    constructor(extendPlanModal, transactionModal) {
        this.extendPlanModal = extendPlanModal;
        this.transactionModal = transactionModal;
    }
    async create(createExtendPlanDto) {
        try {
            const data = await this.extendPlanModal.create(Object.assign({}, createExtendPlanDto));
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Thêm mới extend plan thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(req) {
        var _a, _b;
        try {
            let query = {};
            query = Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.status) && {
                status: req.query.status,
            }));
            const listResult = [];
            const listExtendPlan = await this.extendPlanModal
                .find(query)
                .sort({ createdAt: -1 });
            for (const extendPlan of listExtendPlan) {
                const numberPurchase = await this.transactionModal.countDocuments({
                    extendPlanId: extendPlan._id,
                });
                listResult.push(Object.assign(Object.assign({}, extendPlan.toObject()), { numberPurchase }));
            }
            return listResult;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            return await this.extendPlanModal.findById(id);
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateExtendPlanDto) {
        try {
            const data = await this.extendPlanModal.findByIdAndUpdate(id, updateExtendPlanDto, {
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
            await this.extendPlanModal.findByIdAndUpdate(id, { status: 0 });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Xóa thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
};
ExtendPlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(extendPlans_schema_1.ExtendPlan.name)),
    __param(1, (0, mongoose_1.InjectModel)(transactions_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ExtendPlansService);
exports.ExtendPlansService = ExtendPlansService;
//# sourceMappingURL=extend-plans.service.js.map