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
exports.CloudManagersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cloudManagers_schema_1 = require("../schemas/cloudManagers.schema");
const mongoose_2 = require("mongoose");
const servers_schema_1 = require("../schemas/servers.schema");
const moment = require("moment");
let CloudManagersService = class CloudManagersService {
    constructor(cloudManagerModal, serverModal) {
        this.cloudManagerModal = cloudManagerModal;
        this.serverModal = serverModal;
    }
    async totalCost(totalCostDto) {
        var _a;
        try {
            const startOfMonth = moment(totalCostDto.month)
                .startOf('month')
                .format('YYYY-MM-DD hh:mm');
            const endOfMonth = moment(totalCostDto.month)
                .endOf('month')
                .format('YYYY-MM-DD hh:mm');
            const cost = await this.cloudManagerModal.aggregate([
                {
                    $match: {
                        isDelete: 1,
                        startDate: {
                            $gte: new Date(startOfMonth),
                            $lte: new Date(endOfMonth),
                        },
                    },
                },
                { $group: { _id: 'null', price: { $sum: '$price' } } },
            ]);
            return { cost: (_a = cost === null || cost === void 0 ? void 0 : cost[0]) === null || _a === void 0 ? void 0 : _a.price };
        }
        catch (error) {
            throw error;
        }
    }
    async create(createCloudManagerDto) {
        try {
            return await this.cloudManagerModal.create(Object.assign({}, createCloudManagerDto));
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(req) {
        var _a, _b, _c, _d;
        try {
            const query = Object.assign(Object.assign(Object.assign({ isDelete: 1 }, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.key) && {
                key: { $regex: req.query.key, $options: 'i' },
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.remark) && {
                remark: { $regex: req.query.remark, $options: 'i' },
            }));
            const listCloudManagers = await this.cloudManagerModal.find(query);
            const listData = [];
            for (const cloudManager of listCloudManagers) {
                const server = await this.serverModal.countDocuments({
                    cloudManagerId: cloudManager._id,
                });
                const startDate = moment(moment(cloudManager.startDate).format('YYYY-MM-DD'));
                const today = moment();
                const endDate = moment(moment(cloudManager.endDate).format('YYYY-MM-DD'));
                const dieDate = (cloudManager === null || cloudManager === void 0 ? void 0 : cloudManager.dieDate)
                    ? moment(moment(cloudManager.dieDate).format('YYYY-MM-DD'))
                    : null;
                const valid = endDate.diff(startDate, 'days');
                const remain = endDate.diff(today, 'days');
                const live = (cloudManager === null || cloudManager === void 0 ? void 0 : cloudManager.dieDate)
                    ? dieDate.diff(startDate, 'days')
                    : null;
                listData.push(Object.assign(Object.assign({}, cloudManager === null || cloudManager === void 0 ? void 0 : cloudManager.toObject()), { valid,
                    server,
                    remain,
                    live }));
            }
            const totalCost = await this.cloudManagerModal.aggregate([
                { $match: query },
                { $group: { _id: 'null', price: { $sum: '$price' } } },
            ]);
            return { totalCost: (_d = totalCost === null || totalCost === void 0 ? void 0 : totalCost[0]) === null || _d === void 0 ? void 0 : _d.price, listData };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const cloudManager = await this.cloudManagerModal.findById(id);
            const server = await this.serverModal.countDocuments({
                cloudManagerId: cloudManager._id,
            });
            const startDate = moment(moment(cloudManager.startDate).format('YYYY-MM-DD'));
            const endDate = moment(moment(cloudManager.endDate).format('YYYY-MM-DD'));
            const remain = endDate.diff(startDate, 'days');
            return Object.assign(Object.assign({}, cloudManager === null || cloudManager === void 0 ? void 0 : cloudManager.toObject()), { server, remain });
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateCloudManagerDto) {
        try {
            return await this.cloudManagerModal.findByIdAndUpdate(id, Object.assign({}, updateCloudManagerDto), { new: true });
        }
        catch (error) {
            throw error;
        }
    }
    async updateStatus(id, updateStatusCloudManagerDto) {
        try {
            if (updateStatusCloudManagerDto.status == 1) {
                return await this.cloudManagerModal.findByIdAndUpdate(id, {
                    status: 1,
                    $unset: { dieDate: '' },
                }, { new: true });
            }
            else {
                return await this.cloudManagerModal.findByIdAndUpdate(id, {
                    status: 0,
                    dieDate: new Date(),
                }, { new: true });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.cloudManagerModal.findByIdAndUpdate(id, {
                isDelete: 0,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
CloudManagersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cloudManagers_schema_1.CloudManager.name)),
    __param(1, (0, mongoose_1.InjectModel)(servers_schema_1.Server.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CloudManagersService);
exports.CloudManagersService = CloudManagersService;
//# sourceMappingURL=cloud-managers.service.js.map