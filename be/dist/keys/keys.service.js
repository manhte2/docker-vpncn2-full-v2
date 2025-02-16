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
exports.KeysService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const keys_schema_1 = require("../schemas/keys.schema");
const mongoose_2 = require("mongoose");
const gists_schema_1 = require("../schemas/gists.schema");
const plans_schema_1 = require("../schemas/plans.schema");
const users_schema_1 = require("../schemas/users.schema");
const moment = require("moment");
const config_1 = require("@nestjs/config");
const transactions_schema_1 = require("../schemas/transactions.schema");
const collabs_schema_1 = require("../schemas/collabs.schema");
const outlinevpn_api_1 = require("outlinevpn-api");
const schedule_1 = require("@nestjs/schedule");
const awses_schema_1 = require("../schemas/awses.schema");
const AWS = require("aws-sdk");
const servers_schema_1 = require("../schemas/servers.schema");
const tests_schema_1 = require("../schemas/tests.schema");
const utils_1 = require("../utils");
const constant_1 = require("../utils/constant");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let KeysService = class KeysService {
    constructor(testModal, keyModal, serverModal, gistModal, planModal, userModal, transactionModal, collabModal, awsModal, expriedKeyQueue, expriedDataExpandQueue, configService) {
        this.testModal = testModal;
        this.keyModal = keyModal;
        this.serverModal = serverModal;
        this.gistModal = gistModal;
        this.planModal = planModal;
        this.userModal = userModal;
        this.transactionModal = transactionModal;
        this.collabModal = collabModal;
        this.awsModal = awsModal;
        this.expriedKeyQueue = expriedKeyQueue;
        this.expriedDataExpandQueue = expriedDataExpandQueue;
        this.configService = configService;
        this.S3 = new AWS.S3({
            accessKeyId: configService.get('S3_ACCESS_KEY'),
            secretAccessKey: configService.get('S3_ACCESS_SECRET'),
            region: configService.get('S3_REGION'),
        });
    }
    async test() {
        try {
            const listKey = await this.keyModal.aggregate([
                {
                    $match: {
                        status: 1,
                    },
                },
                {
                    $group: {
                        _id: {
                            name: '$name',
                            status: '$status',
                        },
                        keys: { $push: '$$ROOT' },
                        count: { $sum: 1 },
                    },
                },
                {
                    $match: {
                        count: { $gt: 1 },
                    },
                },
            ]);
            const data = listKey === null || listKey === void 0 ? void 0 : listKey.map((k) => {
                var _a, _b;
                return ({
                    name: (_a = k === null || k === void 0 ? void 0 : k._id) === null || _a === void 0 ? void 0 : _a.name,
                    count: k === null || k === void 0 ? void 0 : k.count,
                    keys: (_b = k === null || k === void 0 ? void 0 : k.keys) === null || _b === void 0 ? void 0 : _b.map((sk) => ({ _id: sk._id, awsId: sk.awsId })),
                });
            });
            for (const d of data) {
                await this.keyModal.findOneAndDelete({
                    _id: d.keys[0]._id,
                });
                await this.gistModal.findOneAndDelete({
                    keyId: d.keys[0]._id,
                });
                await this.awsModal.findOneAndDelete({
                    _id: d.keys[0].awsId,
                });
            }
            return data === null || data === void 0 ? void 0 : data.length;
        }
        catch (err) {
            throw err;
        }
    }
    create(createKeyDto) {
        return 'This action adds a new key';
    }
    async multiMigrate(multiMigrateKeyDto) {
        try {
            for (const keyId of multiMigrateKeyDto.listKeyId) {
                await this.migrate({ keyId, serverId: multiMigrateKeyDto.serverId });
            }
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Multi migrate key thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async migrate(migrateKeyDto) {
        var _a, _b, _c;
        try {
            const newServer = await this.serverModal.findById(migrateKeyDto.serverId);
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: newServer.apiUrl,
                fingerprint: newServer.fingerPrint,
            });
            const userVpn = await outlineVpn.createUser();
            const { id } = userVpn, rest = __rest(userVpn, ["id"]);
            const key = await this.keyModal
                .findById(migrateKeyDto.keyId)
                .populate('awsId')
                .populate('serverId');
            await outlineVpn.addDataLimit(id, key === null || key === void 0 ? void 0 : key.dataExpand);
            await outlineVpn.renameUser(id, key === null || key === void 0 ? void 0 : key.name);
            const gist = await this.gistModal.findOne({
                keyId: migrateKeyDto.keyId,
            });
            const keyAws = await this.S3.upload({
                Bucket: this.configService.get('S3_BUCKET'),
                Key: (_a = key === null || key === void 0 ? void 0 : key.awsId) === null || _a === void 0 ? void 0 : _a.awsId,
                Body: JSON.stringify({
                    server: newServer.hostnameForAccessKeys,
                    server_port: newServer.portForNewAccessKeys,
                    password: rest.password,
                    method: rest.method,
                    prefix: '\u0016\u0003\u0001\u0000¨\u0001\u0001',
                }),
                ContentType: 'application/json',
            }).promise();
            const keyAwsMongo = await this.awsModal.create({
                awsId: keyAws.Key,
                fileName: keyAws.Location,
                prefix: '\u0016\u0003\u0001\u0000¨\u0001\u0001',
            });
            const newKey = await this.keyModal.create({
                keyId: id,
                userId: key === null || key === void 0 ? void 0 : key.userId,
                awsId: keyAwsMongo === null || keyAwsMongo === void 0 ? void 0 : keyAwsMongo._id,
                account: key === null || key === void 0 ? void 0 : key.account,
                serverId: migrateKeyDto === null || migrateKeyDto === void 0 ? void 0 : migrateKeyDto.serverId,
                createDate: key === null || key === void 0 ? void 0 : key.createDate,
                migrateDate: moment(),
                startDate: key === null || key === void 0 ? void 0 : key.startDate,
                endDate: key === null || key === void 0 ? void 0 : key.endDate,
                dataLimit: key === null || key === void 0 ? void 0 : key.dataLimit,
                dataUsage: (key === null || key === void 0 ? void 0 : key.dataUsage) || 0,
                endExpandDate: key === null || key === void 0 ? void 0 : key.endExpandDate,
                dataUsageYesterday: 0,
                arrayDataUsage: (key === null || key === void 0 ? void 0 : key.arrayDataUsage) || [],
                enable: key === null || key === void 0 ? void 0 : key.enable,
                dataExpand: key === null || key === void 0 ? void 0 : key.dataExpand,
                name: key === null || key === void 0 ? void 0 : key.name,
                password: rest === null || rest === void 0 ? void 0 : rest.password,
                port: rest === null || rest === void 0 ? void 0 : rest.port,
                method: rest === null || rest === void 0 ? void 0 : rest.method,
                accessUrl: rest === null || rest === void 0 ? void 0 : rest.accessUrl,
                counterMigrate: constant_1.CYCLE_PLAN,
            });
            const newGist = await this.gistModal.create({
                code: gist.code,
                gistId: gist._id,
                userId: gist === null || gist === void 0 ? void 0 : gist.userId,
                planId: gist.planId,
                keyId: newKey._id,
                fileName: gist.fileName,
                extension: gist.extension,
                createDate: gist === null || gist === void 0 ? void 0 : gist.createDate,
            });
            const aws = await this.awsModal.findById((_b = key === null || key === void 0 ? void 0 : key.awsId) === null || _b === void 0 ? void 0 : _b._id);
            await this.keyModal.findByIdAndUpdate(key._id, { status: 2 });
            await this.gistModal.findByIdAndUpdate(gist._id, { status: 2 });
            await this.awsModal.findByIdAndUpdate(aws._id, { status: 2 });
            const listExtendPlan = await this.transactionModal.find({
                gistId: gist._id,
                extendPlanId: { $exists: true },
            });
            for (const extendPlan of listExtendPlan) {
                await this.transactionModal.findByIdAndUpdate(extendPlan._id, {
                    gistId: newGist._id,
                });
            }
            const listUpgradePlan = await this.transactionModal.find({
                gistId: gist._id,
                planId: { $exists: true },
                description: { $regex: 'Gia hạn', $options: 'i' },
            });
            for (const upgradePlan of listUpgradePlan) {
                await this.transactionModal.findByIdAndUpdate(upgradePlan._id, {
                    gistId: newGist._id,
                });
            }
            if (!newKey.enable) {
                await this.disable((_c = newKey === null || newKey === void 0 ? void 0 : newKey._id) === null || _c === void 0 ? void 0 : _c.toString());
            }
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Migrate key thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    escapeRegex(input) {
        return input.replace(/[^\w\s]/gi, '').replace(' ', '.+');
    }
    async findAll(req) {
        var _a, _b, _c, _d;
        try {
            const startToday = new Date();
            startToday.setHours(0, 0, 0, 0);
            const endToday = new Date();
            endToday.setHours(23, 59, 59, 999);
            let query = {};
            const pageSize = req.query.pageSize || 10;
            const page = req.query.page || 1;
            const skip = Number(pageSize) * (page - 1);
            const take = Number(pageSize);
            query = Object.assign(Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.serverId) && {
                serverId: req.query.serverId,
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.account) && {
                account: {
                    $regex: req.query.account,
                    $options: 'i',
                },
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.status) && {
                status: req.query.status,
            }));
            if (req.query.type === '1') {
                query = Object.assign(Object.assign({}, query), { endDate: {
                        $gte: startToday,
                        $lte: endToday,
                    } });
            }
            if (req.query.type === '2') {
                query = Object.assign(Object.assign({}, query), { createdAt: {
                        $gte: startToday,
                        $lte: endToday,
                    } });
            }
            if (req.query.type === '3') {
                query = Object.assign(Object.assign({}, query), { $expr: { $gt: ['$dataUsage', '$dataLimit'] } });
            }
            const data = await this.keyModal
                .find(query)
                .populate('userId')
                .populate('serverId')
                .populate('awsId')
                .skip(skip)
                .limit(take)
                .sort({ startDate: -1 });
            const totalItems = await this.keyModal.find(query).count();
            const totalPage = Math.ceil(totalItems / Number(pageSize));
            return {
                currentPage: Number(page),
                totalPage,
                itemsPerPage: Number(take),
                totalItems,
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAllWithOutlineDataUsage(req) {
        var _a, _b, _c, _d, _e, _f;
        try {
            const startToday = new Date();
            startToday.setHours(0, 0, 0, 0);
            const endToday = new Date();
            endToday.setHours(23, 59, 59, 999);
            let query = {};
            const pageSize = req.query.pageSize || 10;
            const page = req.query.page || 1;
            const skip = Number(pageSize) * (page - 1);
            const take = Number(pageSize);
            query = Object.assign(Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.serverId) && {
                serverId: req.query.serverId,
            })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.account) && {
                account: {
                    $regex: req.query.account,
                    $options: 'i',
                },
            })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.name) && {
                name: { $regex: req.query.name, $options: 'i' },
            })), (((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.status) && {
                status: req.query.status,
            }));
            if (req.query.type === '1') {
                query = Object.assign(Object.assign({}, query), { endDate: {
                        $gte: startToday,
                        $lte: endToday,
                    } });
            }
            if (req.query.type === '2') {
                query = Object.assign(Object.assign({}, query), { createdAt: {
                        $gte: startToday,
                        $lte: endToday,
                    } });
            }
            if (req.query.type === '3') {
                query = Object.assign(Object.assign({}, query), { $expr: { $gt: ['$dataUsage', '$dataLimit'] } });
            }
            const data = await this.keyModal
                .find(query)
                .populate('userId')
                .populate('serverId')
                .populate('awsId')
                .skip(skip)
                .limit(take);
            const listResult = [];
            for (const d of data) {
                const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                    apiUrl: (_e = d === null || d === void 0 ? void 0 : d.serverId) === null || _e === void 0 ? void 0 : _e.apiUrl,
                    fingerprint: (_f = d === null || d === void 0 ? void 0 : d.serverId) === null || _f === void 0 ? void 0 : _f.fingerPrint,
                });
                const realtimeDataUsage = await this._getDataUsage(outlineVpn, d === null || d === void 0 ? void 0 : d.keyId);
                listResult.push(Object.assign(Object.assign({}, d.toObject()), { realtimeDataUsage }));
            }
            const totalItems = await this.keyModal.find(query).count();
            const totalPage = Math.ceil(totalItems / Number(pageSize));
            return {
                currentPage: Number(page),
                totalPage,
                itemsPerPage: Number(take),
                totalItems,
                data: listResult,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async _getDataUsage(outlineVpn, keyId) {
        try {
            return await outlineVpn.getDataUserUsage(keyId);
        }
        catch (error) {
            console.log(error, ' erorr');
            return 0;
        }
    }
    async todayInfo() {
        try {
            const startToday = moment()
                .subtract(1, 'days')
                .startOf('day')
                .format('YYYY-MM-DD hh:mm');
            const endToday = moment()
                .add(1, 'days')
                .startOf('day')
                .format('YYYY-MM-DD hh:mm');
            const expireToday = await this.keyModal
                .find({
                endDate: {
                    $gt: new Date(startToday),
                    $lt: new Date(endToday),
                },
                status: 1,
            })
                .count();
            const buyToday = await this.keyModal
                .find({
                createDate: {
                    $gt: new Date(startToday),
                    $lt: new Date(endToday),
                },
                status: 1,
            })
                .count();
            const overbandWidthToday = await this.keyModal
                .find({
                $expr: { $gt: ['$dataUsage', '$dataLimit'] },
                status: 1,
            })
                .count();
            return { expireToday, buyToday, overbandWidthToday };
        }
        catch (error) {
            throw error;
        }
    }
    async disableByAdmin(id) {
        var _a;
        try {
            const key = await this.keyModal
                .findById(id)
                .populate('serverId')
                .populate('awsId');
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: (_a = key === null || key === void 0 ? void 0 : key.serverId) === null || _a === void 0 ? void 0 : _a.fingerPrint,
            });
            await outlineVpn.disableUser(key === null || key === void 0 ? void 0 : key.keyId);
            await this.keyModal.findByIdAndUpdate(key._id, {
                enableByAdmin: false,
                enable: false,
            });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Disable key thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async enableByAdmin(id) {
        var _a;
        try {
            const key = await this.keyModal
                .findById(id)
                .populate('serverId')
                .populate('awsId');
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: (_a = key === null || key === void 0 ? void 0 : key.serverId) === null || _a === void 0 ? void 0 : _a.fingerPrint,
            });
            await outlineVpn.enableUser(key === null || key === void 0 ? void 0 : key.keyId);
            await outlineVpn.addDataLimit(key === null || key === void 0 ? void 0 : key.keyId, key === null || key === void 0 ? void 0 : key.dataExpand);
            await this.keyModal.findByIdAndUpdate(key._id, {
                enableByAdmin: true,
                enable: true,
            });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Enable key thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async disable(id) {
        var _a;
        try {
            const key = await this.keyModal
                .findById(id)
                .populate('serverId')
                .populate('awsId');
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: (_a = key === null || key === void 0 ? void 0 : key.serverId) === null || _a === void 0 ? void 0 : _a.fingerPrint,
            });
            await outlineVpn.disableUser(key === null || key === void 0 ? void 0 : key.keyId);
            await this.keyModal.findByIdAndUpdate(key._id, { enable: false });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Disable key thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async enable(id) {
        var _a;
        try {
            const key = await this.keyModal
                .findById(id)
                .populate('serverId')
                .populate('awsId');
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: (_a = key === null || key === void 0 ? void 0 : key.serverId) === null || _a === void 0 ? void 0 : _a.fingerPrint,
            });
            await outlineVpn.enableUser(key === null || key === void 0 ? void 0 : key.keyId);
            await outlineVpn.addDataLimit(key === null || key === void 0 ? void 0 : key.keyId, key === null || key === void 0 ? void 0 : key.dataExpand);
            await this.keyModal.findByIdAndUpdate(key._id, { enable: true });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Enable key thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async addDataLimit(id, addDataLimitKey) {
        var _a;
        try {
            const key = await this.keyModal
                .findById(id)
                .populate('serverId')
                .populate('awsId');
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: (_a = key === null || key === void 0 ? void 0 : key.serverId) === null || _a === void 0 ? void 0 : _a.fingerPrint,
            });
            await outlineVpn.enableUser(key === null || key === void 0 ? void 0 : key.keyId);
            const data = addDataLimitKey.data * 1000000000;
            await outlineVpn.addDataLimit(key === null || key === void 0 ? void 0 : key.keyId, Number(data));
            await this.keyModal.findByIdAndUpdate(key._id, {
                enable: true,
                dataLimit: data,
                dataExpand: data,
            });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Add data thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async updateEndDate(id, endDateKeyDto) {
        try {
            const data = await this.keyModal.findByIdAndUpdate(id, { endDate: endDateKeyDto.endDate }, { new: true });
            return {
                status: common_1.HttpStatus.OK,
                data,
                message: 'Update end date thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const key = await this.keyModal
                .findById(id)
                .populate('awsId')
                .populate('serverId');
            const gist = await this.gistModal
                .findOne({ keyId: key._id })
                .populate('userId')
                .populate('planId');
            const name = key === null || key === void 0 ? void 0 : key.name;
            let historyKey = [];
            if (name) {
                const listHistoryKey = await this.keyModal
                    .find({ name })
                    .populate('serverId');
                historyKey = listHistoryKey === null || listHistoryKey === void 0 ? void 0 : listHistoryKey.filter((e) => { var _a; return (e === null || e === void 0 ? void 0 : e._id.toString()) !== ((_a = key === null || key === void 0 ? void 0 : key._id) === null || _a === void 0 ? void 0 : _a.toString()); });
            }
            return Object.assign(Object.assign({}, key.toObject()), { gist, historyKey });
        }
        catch (error) {
            throw error;
        }
    }
    async upgrade(id) {
        var _a;
        try {
            const gist = await this.gistModal
                .findOne({ keyId: id })
                .populate('keyId')
                .populate('planId');
            const plan = await this.planModal.findById(gist.planId);
            const user = await this.userModal.findById(gist.userId._id);
            if (((_a = gist === null || gist === void 0 ? void 0 : gist.planId) === null || _a === void 0 ? void 0 : _a.price) === 0) {
                throw new common_1.BadRequestException({
                    message: 'Gói dùng thử không thể nâng cấp',
                });
            }
            if (Number(plan.price) > Number(user.money))
                throw new common_1.BadRequestException({
                    message: 'Tài khoản không đủ tiền để đăng kí dịch vụ này',
                });
            const lastEndDate = moment(gist.keyId.endDate);
            const day = gist.planId.day;
            const endDate = lastEndDate.add(day, 'd');
            await this.keyModal.findByIdAndUpdate(gist.keyId._id, {
                endDate,
            });
            const collab = await this.collabModal.findOne({});
            const disccount = user.level === 1
                ? collab['level1']
                : user.level === 2
                    ? collab['level2']
                    : user.level === 3
                        ? collab['level3']
                        : 0;
            const money = ((plan.price * (100 - disccount)) / 100).toFixed(0);
            const code = `${moment().format('YYYYMMDD')}-${(0, utils_1.generateRandomString)(4).toLowerCase()}`;
            await this.transactionModal.create({
                code,
                userId: user._id,
                gistId: gist._id,
                planId: plan._id,
                money: money,
                discount: disccount,
                description: `Đăng kí gói ${plan.name}`,
            });
            await this.userModal.findByIdAndUpdate(user._id, {
                $inc: { money: -money },
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Thêm mới thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async rename(id, renameKeyDto) {
        var _a;
        try {
            const existKey = await this.keyModal.findOne({
                status: 1,
                name: renameKeyDto.name,
            });
            if (existKey)
                throw new common_1.BadRequestException({
                    message: 'Tên key đã tồn tại',
                });
            const key = await this.keyModal.findById(id).populate('serverId');
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: (_a = key === null || key === void 0 ? void 0 : key.serverId) === null || _a === void 0 ? void 0 : _a.fingerPrint,
            });
            await outlineVpn.renameUser(key === null || key === void 0 ? void 0 : key.keyId, renameKeyDto.name);
            await this.gistModal.findOneAndUpdate({ keyId: key._id }, {
                extension: renameKeyDto.name,
            });
            const data = await this.keyModal.findByIdAndUpdate(id, { name: renameKeyDto.name }, { new: true });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Cập nhật tên thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        var _a, _b, _c;
        try {
            const key = await this.keyModal
                .findById(id)
                .populate('serverId')
                .populate('awsId');
            const gist = await this.gistModal.findOne({
                keyId: key._id,
                status: 1,
            });
            key && (await this.keyModal.findByIdAndUpdate(key._id, { status: 0 }));
            gist && (await this.gistModal.findByIdAndUpdate(gist._id, { status: 0 }));
            key &&
                (await this.awsModal.findByIdAndUpdate((_a = key === null || key === void 0 ? void 0 : key.awsId) === null || _a === void 0 ? void 0 : _a._id, { status: 0 }));
            await this.S3.deleteObject({
                Bucket: this.configService.get('S3_BUCKET'),
                Key: (_b = key === null || key === void 0 ? void 0 : key.awsId) === null || _b === void 0 ? void 0 : _b.awsId,
            }).promise();
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: (_c = key === null || key === void 0 ? void 0 : key.serverId) === null || _c === void 0 ? void 0 : _c.fingerPrint,
            });
            await outlineVpn.deleteUser(key.keyId);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Xóa thành công',
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async checkExpiredKey() {
        try {
            console.log('start cron check expire key: ', Date.now());
            const amountQueueWating = await this.expriedKeyQueue.count();
            if (amountQueueWating > 200) {
                await this.expriedKeyQueue.clean(0, 100, 'wait');
            }
            let skip = 0;
            const limit = 10;
            let listKey = [];
            do {
                listKey = (await this.keyModal
                    .find({ status: 1 })
                    .skip(skip)
                    .limit(limit)
                    .populate('serverId'));
                if (listKey.length > 0) {
                    await this.expriedKeyQueue.add('expried-key', { data: listKey });
                }
                skip += limit;
            } while (listKey.length > 0);
            console.log('finnish cron check expire key: ', Date.now());
        }
        catch (error) {
            throw error;
        }
    }
    async _handleExpriedKeyCore(listKey) {
        const today = moment();
        const expiredKeys = listKey.filter((key) => {
            const endDate = moment(key.endDate);
            return endDate.isBefore(today);
        });
        for (const key of expiredKeys) {
            await this.remove(key._id);
        }
    }
    async checkExpireDataExpandKey() {
        try {
            console.log('start cron check expire data expand key: ', Date.now());
            const amountQueueWating = await this.expriedDataExpandQueue.count();
            if (amountQueueWating > 200) {
                await this.expriedDataExpandQueue.clean(0, 100, 'wait');
            }
            let skip = 0;
            const limit = 10;
            let listKey = [];
            const today = moment();
            do {
                listKey = await this.keyModal
                    .find({ status: 1 })
                    .skip(skip)
                    .limit(limit)
                    .populate('serverId');
                if (listKey.length > 0) {
                    await this.expriedDataExpandQueue.add('expried-data-expand-key', {
                        data: listKey,
                    });
                }
                skip += limit;
            } while (listKey.length > 0);
            console.log('finnish cron check expire data expand key: ', Date.now());
        }
        catch (error) { }
    }
    async rollBackDataExpand(key) {
        try {
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: key.serverId.apiUrl,
                fingerprint: key.serverId.fingerPrint,
            });
            const data = key.dataLimit + 5 * 1000000000;
            await outlineVpn.addDataLimit(key.keyId, data);
            await this.keyModal.findByIdAndUpdate(key._id, {
                dataExpand: data,
                enable: true,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async _handleExpriedDataExpandKey(listKey) {
        const today = moment();
        const expiredKeys = listKey.filter((key) => {
            const endExpandDate = moment(key.endExpandDate);
            return endExpandDate.isBefore(today);
        });
        for (const key of expiredKeys) {
            await this.rollBackDataExpand(key);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_1AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KeysService.prototype, "checkExpiredKey", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_3AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KeysService.prototype, "checkExpireDataExpandKey", null);
KeysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tests_schema_1.Test.name)),
    __param(1, (0, mongoose_1.InjectModel)(keys_schema_1.Key.name)),
    __param(2, (0, mongoose_1.InjectModel)(servers_schema_1.Server.name)),
    __param(3, (0, mongoose_1.InjectModel)(gists_schema_1.Gist.name)),
    __param(4, (0, mongoose_1.InjectModel)(plans_schema_1.Plan.name)),
    __param(5, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(6, (0, mongoose_1.InjectModel)(transactions_schema_1.Transaction.name)),
    __param(7, (0, mongoose_1.InjectModel)(collabs_schema_1.Collab.name)),
    __param(8, (0, mongoose_1.InjectModel)(awses_schema_1.Aws.name)),
    __param(9, (0, bullmq_1.InjectQueue)('expried-key')),
    __param(10, (0, bullmq_1.InjectQueue)('expried-data-expand-key')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        bullmq_2.Queue,
        bullmq_2.Queue,
        config_1.ConfigService])
], KeysService);
exports.KeysService = KeysService;
//# sourceMappingURL=keys.service.js.map