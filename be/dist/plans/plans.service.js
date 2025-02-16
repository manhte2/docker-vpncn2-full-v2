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
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const plans_schema_1 = require("../schemas/plans.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
let PlansService = class PlansService {
    constructor(planModal, transactionModal) {
        this.planModal = planModal;
        this.transactionModal = transactionModal;
    }
    async create(createPlanDto) {
        try {
            const data = await this.planModal.create(Object.assign({}, createPlanDto));
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Thêm mới plan thành công',
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
            query = Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.display) && {
                display: req.query.display,
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.status) && {
                status: req.query.status,
            }));
            const listResult = [];
            const listPlan = await this.planModal.find(query).sort({ createdAt: -1 });
            for (const plan of listPlan) {
                const numberPurchase = await this.transactionModal.countDocuments({
                    planId: plan.id,
                });
                listResult.push(Object.assign(Object.assign({}, plan.toObject()), { numberPurchase }));
            }
            return listResult;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            return await this.planModal.findById(id);
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updatePlanDto) {
        try {
            const data = await this.planModal.findByIdAndUpdate(id, updatePlanDto, {
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
            await this.planModal.findByIdAndUpdate(id, { status: 0 });
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
PlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(plans_schema_1.Plan.name)),
    __param(1, (0, mongoose_1.InjectModel)(transactions_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PlansService);
exports.PlansService = PlansService;
//# sourceMappingURL=plans.service.js.map