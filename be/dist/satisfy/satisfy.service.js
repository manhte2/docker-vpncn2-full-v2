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
exports.SatisfyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cashs_schema_1 = require("../schemas/cashs.schema");
const roses_schema_1 = require("../schemas/roses.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const users_schema_1 = require("../schemas/users.schema");
const moment = require("moment");
const servers_schema_1 = require("../schemas/servers.schema");
const keys_schema_1 = require("../schemas/keys.schema");
let SatisfyService = class SatisfyService {
    constructor(cashModal, roseModal, transactionModal, userModal, serverModal, keyModal) {
        this.cashModal = cashModal;
        this.roseModal = roseModal;
        this.transactionModal = transactionModal;
        this.userModal = userModal;
        this.serverModal = serverModal;
        this.keyModal = keyModal;
    }
    async server() {
        var _a, _b;
        try {
            const amountTotalServer = await this.serverModal.countDocuments();
            const amountActiveServer = await this.serverModal.countDocuments({
                status: 1,
            });
            const amountKeyActive = await this.keyModal.countDocuments({ status: 1 });
            const amountRemovedServer = await this.serverModal.countDocuments({
                status: 0,
            });
            const getInfotimeServer = await this.serverModal.aggregate([
                { $match: { status: { $in: [0, 1, 2, 3] } } },
                {
                    $group: {
                        _id: 'time',
                        createdAt: { $sum: { $toLong: '$createdAt' } },
                        updatedAt: { $sum: { $toLong: '$updatedAt' } },
                    },
                },
            ]);
            const totalTime = ((_a = getInfotimeServer === null || getInfotimeServer === void 0 ? void 0 : getInfotimeServer[0]) === null || _a === void 0 ? void 0 : _a.updatedAt) - ((_b = getInfotimeServer === null || getInfotimeServer === void 0 ? void 0 : getInfotimeServer[0]) === null || _b === void 0 ? void 0 : _b.createdAt);
            const day = totalTime / (1000 * 60 * 60 * 24);
            return {
                amountTotalServer,
                amountActiveServer,
                amountKeyActive,
                averageServerLive: day / amountRemovedServer,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async topPlan() {
        try {
            const transaction = await this.transactionModal.aggregate([
                {
                    $group: {
                        _id: '$planId',
                        count: { $sum: 1 },
                        totalMoney: { $sum: '$money' },
                    },
                },
                {
                    $lookup: {
                        from: 'plans',
                        let: { planId: '$_id' },
                        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$planId'] } } }],
                        as: 'plan',
                    },
                },
                {
                    $match: {
                        'plan.price': { $gt: 0 },
                    },
                },
                { $sort: { count: -1 } },
            ]);
            return transaction;
        }
        catch (error) {
            throw error;
        }
    }
    async expiredKey(expiredKeyDto) {
        try {
            const yesterday = moment(expiredKeyDto.day)
                .subtract(1, 'days')
                .format('YYYY-MM-DD hh:mm');
            const tomorrow = moment(expiredKeyDto.day)
                .add(1, 'days')
                .format('YYYY-MM-DD hh:mm');
            const key = await this.keyModal.aggregate([
                {
                    $match: {
                        status: 1,
                        endDate: {
                            $gt: new Date(yesterday),
                            $lt: new Date(tomorrow),
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'servers',
                        localField: 'serverId',
                        foreignField: '_id',
                        as: 'server',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $lookup: {
                        from: 'aws',
                        localField: 'awsId',
                        foreignField: '_id',
                        as: 'aws',
                    },
                },
            ]);
            return key;
        }
        catch (error) {
            throw error;
        }
    }
    async getTopUserByMonth(getTopUserByMonthDto) {
        try {
            const startOfMonth = moment(getTopUserByMonthDto.month)
                .startOf('month')
                .format('YYYY-MM-DD hh:mm');
            const endOfMonth = moment(getTopUserByMonthDto.month)
                .endOf('month')
                .format('YYYY-MM-DD hh:mm');
            const cash = await this.cashModal.aggregate([
                {
                    $match: {
                        status: 1,
                        createdAt: {
                            $gte: new Date(startOfMonth),
                            $lte: new Date(endOfMonth),
                        },
                    },
                },
                {
                    $group: {
                        _id: '$userId',
                        totalMoney: { $sum: '$money' },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: { userId: '$_id' },
                        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } }],
                        as: 'user',
                    },
                },
                { $sort: { totalMoney: -1 } },
                { $limit: 10 },
            ]);
            return cash;
        }
        catch (error) {
            throw error;
        }
    }
    async getTopUser() {
        try {
            const cash = await this.cashModal.aggregate([
                {
                    $match: {
                        status: 1,
                    },
                },
                {
                    $group: {
                        _id: '$userId',
                        totalMoney: { $sum: '$money' },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        let: { userId: '$_id' },
                        pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userId'] } } }],
                        as: 'user',
                    },
                },
                { $sort: { totalMoney: -1 } },
                { $limit: 10 },
            ]);
            return cash;
        }
        catch (error) {
            throw error;
        }
    }
    async newUserToday() {
        try {
            try {
                const yesterday = moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD hh:mm');
                const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD hh:mm');
                const users = await this.userModal.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gt: new Date(yesterday),
                                $lt: new Date(tomorrow),
                            },
                        },
                    },
                ]);
                return users;
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async buyPlanToday() {
        try {
            try {
                const yesterday = moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD hh:mm');
                const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD hh:mm');
                const transactions = await this.transactionModal.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gt: new Date(yesterday),
                                $lt: new Date(tomorrow),
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                    {
                        $lookup: {
                            from: 'plans',
                            localField: 'planId',
                            foreignField: '_id',
                            as: 'plan',
                        },
                    },
                    {
                        $lookup: {
                            from: 'gists',
                            localField: 'gistId',
                            foreignField: '_id',
                            as: 'gist',
                        },
                    },
                    {
                        $lookup: {
                            from: 'extendPlans',
                            localField: 'extendPlanId',
                            foreignField: '_id',
                            as: 'extendPlan',
                        },
                    },
                ]);
                return transactions;
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async fullDataToday() {
        try {
            try {
                const key = await this.keyModal.aggregate([
                    {
                        $match: {
                            status: 1,
                            $expr: { $gt: ['$dataUsage', '$dataExpand'] },
                        },
                    },
                ]);
                return key;
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async newCashToday() {
        try {
            try {
                const yesterday = moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD hh:mm');
                const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD hh:mm');
                const cashs = await this.cashModal.aggregate([
                    {
                        $match: {
                            status: 1,
                            createdAt: {
                                $gt: new Date(yesterday),
                                $lt: new Date(tomorrow),
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'userId',
                            foreignField: '_id',
                            as: 'user',
                        },
                    },
                ]);
                return cashs;
            }
            catch (error) {
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getByLevel() {
        try {
            const cash = await this.cashModal.aggregate([
                {
                    $match: {
                        status: 1,
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $group: {
                        _id: '$user.level',
                        totalMoney: { $sum: '$money' },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        totalMoney: 1,
                        level: '$_id',
                    },
                },
            ]);
            return cash;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const cash = await this.cashModal.aggregate([
                { $match: { userId: new mongoose_2.default.Types.ObjectId(id), status: 1 } },
                { $group: { _id: id, money: { $sum: '$money' } } },
            ]);
            const rose = await this.roseModal.aggregate([
                { $match: { reciveRoseId: new mongoose_2.default.Types.ObjectId(id) } },
                { $group: { _id: id, money: { $sum: '$recive' } } },
            ]);
            const transaction = await this.transactionModal.aggregate([
                { $match: { userId: new mongoose_2.default.Types.ObjectId(id) } },
                { $group: { _id: id, money: { $sum: '$money' } } },
            ]);
            const discount = await this.transactionModal.aggregate([
                {
                    $match: { userId: new mongoose_2.default.Types.ObjectId(id) },
                },
                {
                    $project: {
                        adjustedMoney: {
                            $multiply: [
                                '$money',
                                {
                                    $divide: ['$discount', { $subtract: [100, '$discount'] }],
                                },
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalAdjustedMoney: { $sum: '$adjustedMoney' },
                    },
                },
            ]);
            const user = await this.userModal.findById(id);
            const introduceUser = await this.userModal.find({ introduceCode: id });
            return {
                cash,
                rose,
                transaction,
                discount,
                currentMoney: user === null || user === void 0 ? void 0 : user.money,
                numberIntoduce: introduceUser === null || introduceUser === void 0 ? void 0 : introduceUser.length,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getByMonth(getByMonthDto) {
        try {
            const startOfMonth = moment(getByMonthDto.month)
                .startOf('month')
                .format('YYYY-MM-DD hh:mm');
            const endOfMonth = moment(getByMonthDto.month)
                .endOf('month')
                .format('YYYY-MM-DD hh:mm');
            const cash = await this.cashModal.aggregate([
                {
                    $match: {
                        status: 1,
                        createdAt: {
                            $gte: new Date(startOfMonth),
                            $lte: new Date(endOfMonth),
                        },
                    },
                },
                { $group: { _id: 'cash', money: { $sum: '$money' } } },
            ]);
            const rose = await this.roseModal.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(startOfMonth),
                            $lte: new Date(endOfMonth),
                        },
                    },
                },
                { $group: { _id: 'rose', money: { $sum: '$recive' } } },
            ]);
            const transaction = await this.transactionModal.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(startOfMonth),
                            $lte: new Date(endOfMonth),
                        },
                    },
                },
                { $group: { _id: 'transaction', money: { $sum: '$money' } } },
            ]);
            return {
                cash,
                rose,
                transaction,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getByYear(getByYearDto) {
        try {
            const listResult = [];
            for (let i = 1; i <= 12; i++) {
                const month = getByYearDto.year + '-' + i;
                const startOfMonth = moment(month)
                    .startOf('month')
                    .format('YYYY-MM-DD hh:mm');
                const endOfMonth = moment(month)
                    .endOf('month')
                    .format('YYYY-MM-DD hh:mm');
                const cash = await this.cashModal.aggregate([
                    {
                        $match: {
                            status: 1,
                            createdAt: {
                                $gte: new Date(startOfMonth),
                                $lte: new Date(endOfMonth),
                            },
                        },
                    },
                    { $group: { _id: 'cash', money: { $sum: '$money' } } },
                ]);
                const rose = await this.roseModal.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: new Date(startOfMonth),
                                $lte: new Date(endOfMonth),
                            },
                        },
                    },
                    { $group: { _id: 'rose', money: { $sum: '$recive' } } },
                ]);
                const transaction = await this.transactionModal.aggregate([
                    {
                        $match: {
                            createdAt: {
                                $gte: new Date(startOfMonth),
                                $lte: new Date(endOfMonth),
                            },
                        },
                    },
                    { $group: { _id: 'transaction', money: { $sum: '$money' } } },
                ]);
                listResult.push({ month: i, cash, rose, transaction });
            }
            return listResult;
        }
        catch (error) {
            throw error;
        }
    }
    async cash(cashDto) {
        try {
            const cash = await this.cashModal.aggregate([
                {
                    $match: {
                        status: 1,
                        createdAt: {
                            $gte: new Date(moment(cashDto.startDate).format('YYYY-MM-DD')),
                            $lte: new Date(moment(cashDto.endDate).format('YYYY-MM-DD')),
                        },
                    },
                },
                { $group: { _id: 'cash', money: { $sum: '$money' } } },
            ]);
            return {
                cash,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async transactionPlan(transactionPlanDto) {
        try {
            const transactionPlan = await this.transactionModal.aggregate([
                {
                    $match: {
                        planId: new mongoose_2.default.Types.ObjectId(transactionPlanDto.planId),
                        createdAt: {
                            $gte: new Date(moment(transactionPlanDto.startDate).format('YYYY-MM-DD')),
                            $lte: new Date(moment(transactionPlanDto.endDate).format('YYYY-MM-DD')),
                        },
                    },
                },
                { $group: { _id: 'transaction-plan', money: { $sum: '$money' } } },
            ]);
            return {
                transactionPlan,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async transactionExtendPlan(transactionExtendPlanDto) {
        try {
            const transactionExtendPlan = await this.transactionModal.aggregate([
                {
                    $match: {
                        extendPlanId: new mongoose_2.default.Types.ObjectId(transactionExtendPlanDto.extendPlanId),
                        createdAt: {
                            $gte: new Date(moment(transactionExtendPlanDto.startDate).format('YYYY-MM-DD')),
                            $lte: new Date(moment(transactionExtendPlanDto.endDate).format('YYYY-MM-DD')),
                        },
                    },
                },
                {
                    $group: { _id: 'transaction-extend-plan', money: { $sum: '$money' } },
                },
            ]);
            return {
                transactionExtendPlan,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
SatisfyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cashs_schema_1.Cash.name)),
    __param(1, (0, mongoose_1.InjectModel)(roses_schema_1.Rose.name)),
    __param(2, (0, mongoose_1.InjectModel)(transactions_schema_1.Transaction.name)),
    __param(3, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(4, (0, mongoose_1.InjectModel)(servers_schema_1.Server.name)),
    __param(5, (0, mongoose_1.InjectModel)(keys_schema_1.Key.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SatisfyService);
exports.SatisfyService = SatisfyService;
//# sourceMappingURL=satisfy.service.js.map