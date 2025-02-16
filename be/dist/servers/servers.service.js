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
exports.ServersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const servers_schema_1 = require("../schemas/servers.schema");
const outlinevpn_api_1 = require("outlinevpn-api");
const keys_schema_1 = require("../schemas/keys.schema");
const gists_schema_1 = require("../schemas/gists.schema");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const awses_schema_1 = require("../schemas/awses.schema");
const AWS = require("aws-sdk");
const keys_service_1 = require("../keys/keys.service");
const settingBandwidths_schema_1 = require("../schemas/settingBandwidths.schema");
const constant_1 = require("../utils/constant");
const kuma_service_1 = require("../kuma/kuma.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let ServersService = class ServersService {
    constructor(serverModal, keyModal, gistModal, awsModal, settingBandwidthModal, dataUsageQueue, keyService, configService, kumaService) {
        this.serverModal = serverModal;
        this.keyModal = keyModal;
        this.gistModal = gistModal;
        this.awsModal = awsModal;
        this.settingBandwidthModal = settingBandwidthModal;
        this.dataUsageQueue = dataUsageQueue;
        this.keyService = keyService;
        this.configService = configService;
        this.kumaService = kumaService;
        this.S3 = new AWS.S3({
            accessKeyId: configService.get('S3_ACCESS_KEY'),
            secretAccessKey: configService.get('S3_ACCESS_SECRET'),
            region: configService.get('S3_REGION'),
        });
    }
    async settingBandWidthDefault(settingBandWidthDefaultDto) {
        try {
            const settingBandwidthDefault = await this.settingBandwidthModal.findOne({});
            if (settingBandwidthDefault) {
                await this.settingBandwidthModal.findByIdAndUpdate(settingBandwidthDefault._id, {
                    value: Number(settingBandWidthDefaultDto.value) * 1000000000,
                });
            }
            else {
                await this.settingBandwidthModal.create({
                    value: Number(settingBandWidthDefaultDto.value) * 1000000000,
                });
            }
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Thiết lập bandwidth thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findSettingBandWidthDefault() {
        try {
            return await this.settingBandwidthModal.findOne();
        }
        catch (error) {
            throw error;
        }
    }
    async migrate(migrateServerDto) {
        var _a;
        try {
            const listKey = await this.keyModal.find({
                serverId: migrateServerDto.oldServerId,
                status: 1,
            });
            for (const key of listKey) {
                await this.keyService.migrate({
                    keyId: (_a = key._id) === null || _a === void 0 ? void 0 : _a.toString(),
                    serverId: migrateServerDto.newServerId,
                });
            }
            return {
                status: common_1.HttpStatus.OK,
                message: 'Migrate server thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async sync(syncServerDto) {
        try {
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: syncServerDto.apiUrl,
                fingerprint: syncServerDto.fingerPrint,
            });
            const server = await outlineVpn.getServer();
            if ((syncServerDto === null || syncServerDto === void 0 ? void 0 : syncServerDto.isCheckUnique) !== '1') {
                const existServerRemoved = await this.serverModal.findOne({
                    hostnameForAccessKeys: server.hostnameForAccessKeys,
                    status: 0,
                });
                if (existServerRemoved) {
                    return {
                        status: common_1.HttpStatus.OK,
                        isCheckUnique: 1,
                        message: 'Server đã được xóa trước đây',
                    };
                }
                const existServerActive = await this.serverModal.findOne({
                    hostnameForAccessKeys: server.hostnameForAccessKeys,
                    status: 1,
                });
                if (existServerActive) {
                    return {
                        status: common_1.HttpStatus.OK,
                        isCheckUnique: 1,
                        message: 'Server đang năm trong danh sách server active',
                    };
                }
                const existServerDowned = await this.serverModal.findOne({
                    hostnameForAccessKeys: server.hostnameForAccessKeys,
                    status: 2,
                });
                if (existServerDowned) {
                    return {
                        status: common_1.HttpStatus.OK,
                        isCheckUnique: 1,
                        message: 'Server đang năm trong danh sách server down',
                    };
                }
                const existServerMaintain = await this.serverModal.findOne({
                    hostnameForAccessKeys: server.hostnameForAccessKeys,
                    status: 3,
                });
                if (existServerMaintain) {
                    return {
                        status: common_1.HttpStatus.OK,
                        isCheckUnique: 1,
                        message: 'Server đang năm trong danh sách server maintain',
                    };
                }
            }
            const serverMongo = await this.serverModal.findOne({
                hostnameForAccessKeys: server.hostnameForAccessKeys,
                status: 1,
            });
            if (serverMongo) {
                await this.serverModal.findByIdAndUpdate(serverMongo._id, Object.assign(Object.assign(Object.assign({}, server), syncServerDto), { totalBandWidth: (syncServerDto === null || syncServerDto === void 0 ? void 0 : syncServerDto.totalBandWidth) > 0
                        ? (syncServerDto === null || syncServerDto === void 0 ? void 0 : syncServerDto.totalBandWidth) * 1000000000
                        : 6000000000000 }));
            }
            else {
                await this.serverModal.create(Object.assign(Object.assign(Object.assign({}, server), syncServerDto), { totalBandWidth: (syncServerDto === null || syncServerDto === void 0 ? void 0 : syncServerDto.totalBandWidth) > 0
                        ? (syncServerDto === null || syncServerDto === void 0 ? void 0 : syncServerDto.totalBandWidth) * 1000000000
                        : 6000000000000 }));
            }
            return {
                status: common_1.HttpStatus.OK,
                message: 'Đồng bộ thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getServerToMigrate(req) {
        var _a, _b, _c;
        try {
            let query = {};
            query = Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.status) && {
                status: req.query.status,
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.location) && {
                location: { $regex: req.query.location, $options: 'i' },
            }));
            const servers = await this.serverModal
                .find(query)
                .sort({ createdAt: -1 });
            const listResult = [];
            for (const sv of servers) {
                const numberKey = await this.keyModal.countDocuments({
                    serverId: sv._id,
                    status: 1,
                });
                listResult.push(Object.assign(Object.assign({}, sv.toObject()), { numberKey }));
            }
            return listResult;
        }
        catch (error) {
            throw error;
        }
    }
    async getNormalServer(req) {
        var _a, _b, _c;
        try {
            let query = {};
            query = Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.status) && {
                status: req.query.status,
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.location) && {
                location: { $regex: req.query.location, $options: 'i' },
            }));
            const listResult = [];
            const listServer = await this.serverModal
                .find(query)
                .sort({ createdAt: -1 });
            for (const server of listServer) {
                const numberKey = await this.keyModal.countDocuments({
                    serverId: server._id,
                    status: 1,
                });
                listResult.push(Object.assign(Object.assign({}, server.toObject()), { numberKey }));
            }
            return listResult;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(req) {
        var _a, _b, _c, _d;
        try {
            let query = {};
            query = Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.status) && {
                status: req.query.status,
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.location) && {
                location: { $regex: req.query.location, $options: 'i' },
            }));
            const listResult = [];
            const listServer = await this.serverModal
                .find(query)
                .sort({ createdAt: -1 });
            for (const server of listServer) {
                const numberKey = await this.keyModal.countDocuments({
                    serverId: server._id,
                    status: 1,
                });
                if (server.status === 1) {
                    try {
                        const maxUsage = await this.keyModal.aggregate([
                            {
                                $match: {
                                    serverId: new mongoose_2.default.Types.ObjectId(server._id),
                                    status: 1,
                                },
                            },
                            {
                                $group: { _id: server._id, maxUsage: { $sum: '$dataExpand' } },
                            },
                        ]);
                        const r = await this.serverModal.findByIdAndUpdate(server._id, {
                            maxUsage: (_d = maxUsage === null || maxUsage === void 0 ? void 0 : maxUsage[0]) === null || _d === void 0 ? void 0 : _d.maxUsage,
                        }, { new: true });
                        listResult.push(Object.assign(Object.assign({}, r.toObject()), { numberKey }));
                    }
                    catch (error) {
                        listResult.push(Object.assign(Object.assign({}, server.toObject()), { numberKey }));
                        continue;
                    }
                }
                else {
                    listResult.push(Object.assign(Object.assign({}, server.toObject()), { numberKey }));
                }
            }
            return listResult;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            return await this.serverModal.findById(id);
        }
        catch (error) {
            throw error;
        }
    }
    async updateLocation(id, updateLocationServerDto) {
        try {
            const data = await this.serverModal.findByIdAndUpdate(id, {
                location: updateLocationServerDto.location,
            }, { new: true });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Cập nhật địa chỉ thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateRemark(id, updateRemarkServerDto) {
        try {
            const data = await this.serverModal.findByIdAndUpdate(id, {
                remark: updateRemarkServerDto.remark,
            }, { new: true });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Cập nhật remark thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateTotalBanwidth(id, updateTotalBandwidthServerDto) {
        try {
            const data = await this.serverModal.findByIdAndUpdate(id, {
                totalBandWidth: Number(updateTotalBandwidthServerDto.totalBandwidth) * 1000000000,
            }, { new: true });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Cập nhật total bandwidth thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateNameServer(id, updateNameServerDto) {
        try {
            const server = await this.serverModal.findById(id);
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: server.apiUrl,
                fingerprint: server.fingerPrint,
            });
            await outlineVpn.renameServer(updateNameServerDto.name);
            const data = await this.serverModal.findByIdAndUpdate(id, {
                name: updateNameServerDto.name,
            }, { new: true });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Cập nhật name server thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateStautsServer(id, updateStatusServerDto) {
        try {
            const data = await this.serverModal.findByIdAndUpdate(id, {
                status: updateStatusServerDto.status,
            }, { new: true });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Cập nhật status server thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateCloudManager(id, updateCloudManagerDto) {
        try {
            const data = await this.serverModal.findByIdAndUpdate(id, {
                cloudManagerId: updateCloudManagerDto.cloudManagerId,
            }, { new: true });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Cập nhật cloud manager thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id, req) {
        try {
            const listKey = await this.keyModal
                .find({ serverId: id, status: 1 })
                .populate('serverId')
                .populate('awsId');
            if (req.query.isDeleteKuma == 1) {
                await this.kumaService.remove({ id });
            }
            await this.serverModal.findByIdAndUpdate(id, { status: 0 });
            if ((listKey === null || listKey === void 0 ? void 0 : listKey.length) > 0) {
                for (const key of listKey) {
                    await this.keyService.remove(key._id);
                }
            }
            return {
                status: common_1.HttpStatus.OK,
                message: 'Xóa thành công',
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createDefaulBandWidth() {
        try {
            const settingBandWidthDefault = await this.settingBandwidthModal.findOne();
            if (settingBandWidthDefault)
                return;
            await this.settingBandwidthModal.create({
                value: Number(this.configService.get('BANDWIDTH_DEFAULT')) * 1000000000,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getDataUsage() {
        try {
            const amountQueueWating = await this.dataUsageQueue.count();
            if (amountQueueWating > 200) {
                await this.dataUsageQueue.clean(0, 100, 'wait');
            }
            console.log('start cron data usage: ', Date.now());
            let skip = 0;
            const limit = 10;
            let listKey = [];
            do {
                listKey = await this.keyModal
                    .find({ status: 1 })
                    .skip(skip)
                    .limit(limit)
                    .populate('serverId');
                if (listKey.length > 0) {
                    await this.dataUsageQueue.add('data-usage', { data: listKey });
                }
                skip += limit;
            } while (listKey.length > 0);
            console.log('finnish cron data usage: ', Date.now());
        }
        catch (error) {
            throw error;
        }
    }
    async _handleCoreGetDataUsage(listKey) {
        var _a;
        for (const key of listKey) {
            let dataAdd = 0;
            let dataUsageYesterday = 0;
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: key.serverId.fingerPrint,
            });
            try {
                const dataUsage = await outlineVpn.getDataUsage();
                const bytesTransferredByUserId = dataUsage.bytesTransferredByUserId;
                dataUsageYesterday = bytesTransferredByUserId[key.keyId] || 0;
            }
            catch (error) {
                continue;
            }
            const arrayDataUsage = (key === null || key === void 0 ? void 0 : key.arrayDataUsage) || [];
            let counterMigrate = (key === null || key === void 0 ? void 0 : key.counterMigrate) || 0;
            if (counterMigrate > 0) {
                dataAdd =
                    Number(dataUsageYesterday) - Number(key.dataUsageYesterday) > 0
                        ? Number(dataUsageYesterday) - Number(key.dataUsageYesterday)
                        : 0;
                if ((arrayDataUsage === null || arrayDataUsage === void 0 ? void 0 : arrayDataUsage.length) < constant_1.CYCLE_PLAN) {
                    arrayDataUsage.push(dataAdd);
                }
                else {
                    arrayDataUsage.push(dataAdd);
                    arrayDataUsage.shift();
                }
                counterMigrate = counterMigrate - 1;
            }
            else {
                if ((arrayDataUsage === null || arrayDataUsage === void 0 ? void 0 : arrayDataUsage.length) < constant_1.CYCLE_PLAN) {
                    dataAdd =
                        Number(dataUsageYesterday) - Number(key.dataUsageYesterday) > 0
                            ? Number(dataUsageYesterday) - Number(key.dataUsageYesterday)
                            : 0;
                    arrayDataUsage.push(dataAdd);
                }
                else {
                    dataAdd =
                        Number(dataUsageYesterday) -
                            Number(key.dataUsageYesterday) +
                            Number(arrayDataUsage[0]) >
                            0
                            ? Number(dataUsageYesterday) -
                                Number(key.dataUsageYesterday) +
                                Number(arrayDataUsage[0])
                            : 0;
                    arrayDataUsage.push(dataAdd);
                    arrayDataUsage.shift();
                }
            }
            const totalDataUsage = ((_a = key === null || key === void 0 ? void 0 : key.arrayDataUsage) === null || _a === void 0 ? void 0 : _a.reduce((a, b) => a + b, 0)) || 0;
            await this.keyModal.findByIdAndUpdate(key._id, {
                dataUsageYesterday,
                arrayDataUsage: arrayDataUsage === null || arrayDataUsage === void 0 ? void 0 : arrayDataUsage.filter((item) => item !== null && item !== undefined),
                dataUsage: totalDataUsage,
                counterMigrate,
            });
            if (totalDataUsage > key.dataExpand) {
                await this.keyService.disable(key._id);
            }
            else {
                await this.keyService.enable(key._id);
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServersService.prototype, "getDataUsage", null);
ServersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(servers_schema_1.Server.name)),
    __param(1, (0, mongoose_1.InjectModel)(keys_schema_1.Key.name)),
    __param(2, (0, mongoose_1.InjectModel)(gists_schema_1.Gist.name)),
    __param(3, (0, mongoose_1.InjectModel)(awses_schema_1.Aws.name)),
    __param(4, (0, mongoose_1.InjectModel)(settingBandwidths_schema_1.SettingBandwidth.name)),
    __param(5, (0, bullmq_1.InjectQueue)('data-usage')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        bullmq_2.Queue,
        keys_service_1.KeysService,
        config_1.ConfigService,
        kuma_service_1.KumaService])
], ServersService);
exports.ServersService = ServersService;
//# sourceMappingURL=servers.service.js.map