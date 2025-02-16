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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const transactions_schema_1 = require("../schemas/transactions.schema");
const mongoose_2 = require("mongoose");
const gists_schema_1 = require("../schemas/gists.schema");
let TransactionsService = class TransactionsService {
    constructor(transactionModal, gistModal) {
        this.transactionModal = transactionModal;
        this.gistModal = gistModal;
    }
    create(createTransactionDto) {
        return 'This action adds a new transaction';
    }
    async historyExtendPlan(historyExtendPlanTransactionDto) {
        const gist = await this.gistModal.findOne({
            keyId: historyExtendPlanTransactionDto.keyId,
        });
        return await this.transactionModal
            .find({ gistId: gist._id, extendPlanId: { $exists: true } })
            .sort({ createdAt: -1 })
            .populate('userId')
            .populate({
            path: 'gistId',
            populate: {
                path: 'keyId',
            },
        })
            .populate('extendPlanId');
    }
    async historyUpgradePlan(historyExtendPlanTransactionDto) {
        const gist = await this.gistModal.findOne({
            keyId: historyExtendPlanTransactionDto.keyId,
        });
        return await this.transactionModal
            .find({
            gistId: gist._id,
            planId: { $exists: true },
            description: { $regex: 'Gia hạn', $options: 'i' },
        })
            .sort({ createdAt: -1 })
            .populate('userId')
            .populate({
            path: 'gistId',
            populate: {
                path: 'keyId',
            },
        })
            .populate('planId');
    }
    async test() {
        const data = await this.transactionModal
            .find({
            planId: { $exists: true },
            description: { $regex: 'Gia hạn', $options: 'i' },
        })
            .sort({ createdAt: -1 })
            .populate('userId')
            .populate({
            path: 'gistId',
            populate: {
                path: 'keyId',
            },
        })
            .populate('planId');
        return data;
    }
    async findAll(req) {
        var _a;
        try {
            let query = {};
            query = Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId) && {
                userId: req.query.userId,
            }));
            return await this.transactionModal
                .find(query)
                .sort({ createdAt: -1 })
                .populate('userId')
                .populate({
                path: 'gistId',
                populate: {
                    path: 'keyId',
                },
            })
                .populate('planId')
                .populate('extendPlanId');
        }
        catch (error) {
            throw error;
        }
    }
    findOne(id) {
        return `This action returns a #${id} transaction`;
    }
    update(id, updateTransactionDto) {
        return `This action updates a #${id} transaction`;
    }
    remove(id) {
        return `This action removes a #${id} transaction`;
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transactions_schema_1.Transaction.name)),
    __param(1, (0, mongoose_1.InjectModel)(gists_schema_1.Gist.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TransactionsService);
exports.TransactionsService = TransactionsService;
//# sourceMappingURL=transactions.service.js.map