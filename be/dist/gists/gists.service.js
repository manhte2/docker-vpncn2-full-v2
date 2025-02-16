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
exports.GistsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const gists_schema_1 = require("../schemas/gists.schema");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const moment = require("moment");
const plans_schema_1 = require("../schemas/plans.schema");
const servers_schema_1 = require("../schemas/servers.schema");
const keys_schema_1 = require("../schemas/keys.schema");
const outlinevpn_api_1 = require("outlinevpn-api");
const users_schema_1 = require("../schemas/users.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const commisions_schema_1 = require("../schemas/commisions.schema");
const roses_schema_1 = require("../schemas/roses.schema");
const collabs_schema_1 = require("../schemas/collabs.schema");
const utils_1 = require("../utils");
const AWS = require("aws-sdk");
const awses_schema_1 = require("../schemas/awses.schema");
let GistsService = class GistsService {
    constructor(gistModal, planModal, serverModal, keyModal, userModal, transactionModal, commisionModal, roseModal, collabModal, awsModal, configService) {
        this.gistModal = gistModal;
        this.planModal = planModal;
        this.serverModal = serverModal;
        this.keyModal = keyModal;
        this.userModal = userModal;
        this.transactionModal = transactionModal;
        this.commisionModal = commisionModal;
        this.roseModal = roseModal;
        this.collabModal = collabModal;
        this.awsModal = awsModal;
        this.configService = configService;
        this.S3 = new AWS.S3({
            accessKeyId: configService.get('S3_ACCESS_KEY'),
            secretAccessKey: configService.get('S3_ACCESS_SECRET'),
            region: configService.get('S3_REGION'),
        });
    }
    async create(createGistDto) {
        var _a, _b, _c, _d, _e;
        try {
            const commision = await this.commisionModal.findOne({});
            const plan = await this.planModal.findById(createGistDto.planId);
            const user = await this.userModal.findById(createGistDto.userId);
            if (plan.price === 0 && user.level === 0 && user.isFree === 1) {
                throw new common_1.BadRequestException({
                    message: 'Bạn đã đăng kí gói dùng thử.',
                    remark: 400,
                });
            }
            if (Number(plan.price) > Number(user.money))
                throw new common_1.BadRequestException({
                    message: 'Bạn không đủ tiền để đăng kí dịch vụ này',
                });
            const startDate = moment();
            const endDate = moment().add(plan.day, 'd');
            const randomKey = (0, utils_1.generateRandomString)(4).toLocaleLowerCase();
            const fileName = `${moment(startDate).format('YYYYMMDD')}-${(_b = (_a = plan.name) === null || _a === void 0 ? void 0 : _a.replace(/[^a-zA-Z0-9]/g, '')) === null || _b === void 0 ? void 0 : _b.toLowerCase()}-${user.username}-${randomKey}.json`;
            const listServer = await this.serverModal
                .find({ status: 1 })
                .select([
                '_id',
                'hostnameForAccessKeys',
                'portForNewAccessKeys',
                'totalBandWidth',
            ]);
            if ((listServer === null || listServer === void 0 ? void 0 : listServer.length) < 1) {
                throw new common_1.BadRequestException({
                    message: 'Hiện chưa có server nào hoạt động. Vui lòng quay lại sau',
                });
            }
            const keyCountByServerId = [];
            for (const server of listServer) {
                const dataLimit = await this.keyModal.aggregate([
                    {
                        $match: {
                            serverId: new mongoose_2.default.Types.ObjectId(server._id),
                            status: 1,
                        },
                    },
                    {
                        $group: {
                            _id: server._id,
                            dataLimit: { $sum: '$dataExpand' },
                        },
                    },
                ]);
                keyCountByServerId.push({
                    serverId: server._id,
                    dataLimit: ((_c = dataLimit === null || dataLimit === void 0 ? void 0 : dataLimit[0]) === null || _c === void 0 ? void 0 : _c.dataLimit) || 0,
                    serverIp: server.hostnameForAccessKeys,
                    serverPort: server.portForNewAccessKeys,
                    totalBandWidth: server.totalBandWidth,
                });
            }
            const sortedKeyCountByServerId = keyCountByServerId.sort((a, b) => Number(a.dataLimit) / Number(a.totalBandWidth) -
                Number(b.dataLimit) / Number(b.totalBandWidth));
            const leastKeyServerId = sortedKeyCountByServerId[0].serverId;
            const serverMongo = await this.serverModal.findById(leastKeyServerId);
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: serverMongo.apiUrl,
                fingerprint: serverMongo.fingerPrint,
            });
            const userVpn = await outlineVpn.createUser();
            const { id } = userVpn, rest = __rest(userVpn, ["id"]);
            const data = plan.bandWidth * 1000000000;
            await outlineVpn.addDataLimit(id, data);
            const today = moment().startOf('day');
            const amount = await this.gistModal.countDocuments({
                userId: user._id,
                planId: plan._id,
                createDate: {
                    $gte: today.toDate(),
                    $lt: moment(today).endOf('day').toDate(),
                },
                status: 1,
            });
            const nameKey = `${(_e = (_d = plan.name) === null || _d === void 0 ? void 0 : _d.replace(/[^a-zA-Z0-9]/g, '')) === null || _e === void 0 ? void 0 : _e.toLowerCase()}-${user.username.toLowerCase()}-${moment(startDate).format('YYMMDD')}-${amount + 1}`;
            await outlineVpn.renameUser(id, nameKey);
            const keyAws = await this.S3.upload({
                Bucket: this.configService.get('S3_BUCKET'),
                Key: fileName,
                Body: JSON.stringify({
                    server: sortedKeyCountByServerId[0].serverIp,
                    server_port: sortedKeyCountByServerId[0].serverPort,
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
            const key = await this.keyModal.create(Object.assign(Object.assign({ keyId: id, userId: user._id, awsId: keyAwsMongo._id, account: user.username, serverId: leastKeyServerId, startDate,
                endDate, dataLimit: data, dataExpand: data }, rest), { name: nameKey, createDate: moment() }));
            const code = `${moment().format('YYYYMMDD')}-${randomKey}`;
            const gistMongo = await this.gistModal.create(Object.assign(Object.assign({}, createGistDto), { extension: nameKey, fileName, keyId: key._id, code, createDate: moment() }));
            const collab = await this.collabModal.findOne({});
            const disccount = user.level === 1
                ? collab['level1']
                : user.level === 2
                    ? collab['level2']
                    : user.level === 3
                        ? collab['level3']
                        : 0;
            const money = ((plan.price * (100 - disccount)) / 100).toFixed(0);
            await this.transactionModal.create({
                code,
                userId: createGistDto.userId,
                gistId: gistMongo._id,
                planId: createGistDto.planId,
                money: money,
                discount: disccount,
                description: `Đăng kí gói ${plan.name}`,
            });
            await this.userModal.findByIdAndUpdate(user._id, {
                $inc: { money: -money },
            });
            if (commision.value > 0 &&
                user.introduceUserId &&
                user.level === 0 &&
                plan.price > 0) {
                const recive = ((plan.price * commision.value) / 100).toFixed(0);
                await this.roseModal.create({
                    code,
                    reciveRoseId: user.introduceUserId,
                    introducedId: user._id,
                    plan: plan.name,
                    price: plan.price,
                    percent: commision.value,
                    recive,
                });
                await this.userModal.findByIdAndUpdate(user.introduceUserId, {
                    $inc: { money: recive },
                });
            }
            if (plan.price === 0 && user.isFree === 0) {
                await this.userModal.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, { isFree: 1 });
            }
            const result = await this.gistModal
                .findById(gistMongo._id)
                .populate('userId')
                .populate('planId')
                .populate({
                path: 'keyId',
                populate: {
                    path: 'awsId',
                },
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Thêm mới thành công',
                data: result,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(req) {
        var _a, _b, _c, _d, _e;
        let query = {};
        const pageSize = req.query.pageSize || 10;
        const page = req.query.page || 1;
        const skip = Number(pageSize) * (page - 1);
        const take = Number(pageSize);
        query = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.userId) && {
            userId: req.query.userId,
        })), (((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.status) && {
            status: req.query.status,
        })), (((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.planId) && {
            planId: req.query.planId,
        })), (((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.keyId) && {
            keyId: req.query.keyId,
        })), (((_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.extension) && {
            extension: { $regex: req.query.extension, $options: 'i' },
        }));
        try {
            const data = await this.gistModal
                .find(query)
                .sort({ createdAt: -1 })
                .populate('userId')
                .populate('planId')
                .populate({
                path: 'keyId',
                populate: [{ path: 'awsId' }, { path: 'serverId' }],
            })
                .skip(skip)
                .limit(take);
            const totalItems = await this.gistModal.find(query).count();
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
    async findOne(id) {
        try {
            const gistMongo = await this.gistModal
                .findById(id)
                .populate('userId')
                .populate('userId')
                .populate('planId')
                .populate({
                path: 'keyId',
                populate: {
                    path: 'awsId',
                },
            });
            return Object.assign({}, gistMongo.toObject());
        }
        catch (error) {
            throw error;
        }
    }
    async updateExtension(id, updateExtensionGistDto) {
        try {
            const gist = await this.gistModal.findById(id).populate({
                path: 'keyId',
                populate: {
                    path: 'serverId',
                },
            });
            const keyId = gist.keyId._id;
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: gist.keyId.serverId.apiUrl,
                fingerprint: gist.keyId.serverId.fingerPrint,
            });
            await outlineVpn.renameUser(gist.keyId.keyId, updateExtensionGistDto.extension);
            await this.keyModal.findByIdAndUpdate(keyId, {
                name: updateExtensionGistDto.extension,
            });
            const updatedGist = await this.gistModal.findByIdAndUpdate(id, {
                extension: updateExtensionGistDto.extension,
            }, { new: true });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Cập nhật thông tin thành công',
                updatedGist,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.gistModal.deleteOne({ _id: id });
            return {
                status: common_1.HttpStatus.OK,
                message: 'Xóa thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async backUp(backUpGistDto) {
        var _a, _b;
        try {
            const keyBU = await this.keyModal.findById(backUpGistDto.keyId);
            const aws = await this.awsModal.findById(keyBU.awsId);
            const gist = await this.gistModal.findOne({ keyId: keyBU._id });
            const fileName = (_a = aws === null || aws === void 0 ? void 0 : aws.fileName) === null || _a === void 0 ? void 0 : _a.split('/').pop();
            const listServer = await this.serverModal
                .find({ status: 1 })
                .select([
                '_id',
                'hostnameForAccessKeys',
                'portForNewAccessKeys',
                'totalBandWidth',
            ]);
            if ((listServer === null || listServer === void 0 ? void 0 : listServer.length) < 1) {
                throw new common_1.BadRequestException({
                    message: 'Hiện chưa có server nào hoạt động. Vui lòng quay lại sau',
                });
            }
            const keyCountByServerId = [];
            for (const server of listServer) {
                const dataLimit = await this.keyModal.aggregate([
                    {
                        $match: {
                            serverId: new mongoose_2.default.Types.ObjectId(server._id),
                            status: 1,
                        },
                    },
                    {
                        $group: {
                            _id: server._id,
                            dataLimit: { $sum: '$dataExpand' },
                        },
                    },
                ]);
                keyCountByServerId.push({
                    serverId: server._id,
                    dataLimit: ((_b = dataLimit === null || dataLimit === void 0 ? void 0 : dataLimit[0]) === null || _b === void 0 ? void 0 : _b.dataLimit) || 0,
                    serverIp: server.hostnameForAccessKeys,
                    serverPort: server.portForNewAccessKeys,
                    totalBandWidth: server.totalBandWidth,
                });
            }
            const sortedKeyCountByServerId = keyCountByServerId.sort((a, b) => Number(a.dataLimit) / Number(a.totalBandWidth) -
                Number(b.dataLimit) / Number(b.totalBandWidth));
            const leastKeyServerId = sortedKeyCountByServerId[0].serverId;
            const serverMongo = await this.serverModal.findById(leastKeyServerId);
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: serverMongo.apiUrl,
                fingerprint: serverMongo.fingerPrint,
            });
            const userVpn = await outlineVpn.createUser();
            const { id } = userVpn, rest = __rest(userVpn, ["id"]);
            await outlineVpn.addDataLimit(id, keyBU === null || keyBU === void 0 ? void 0 : keyBU.dataExpand);
            await outlineVpn.renameUser(id, keyBU === null || keyBU === void 0 ? void 0 : keyBU.name);
            const keyAws = await this.S3.upload({
                Bucket: this.configService.get('S3_BUCKET'),
                Key: fileName,
                Body: JSON.stringify({
                    server: sortedKeyCountByServerId[0].serverIp,
                    server_port: sortedKeyCountByServerId[0].serverPort,
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
            const key = await this.keyModal.create(Object.assign(Object.assign({}, rest), { keyId: id, awsId: keyAwsMongo._id, serverId: leastKeyServerId, name: keyBU === null || keyBU === void 0 ? void 0 : keyBU.name, enable: keyBU === null || keyBU === void 0 ? void 0 : keyBU.enable, enableByAdmin: keyBU === null || keyBU === void 0 ? void 0 : keyBU.enableByAdmin, dataLimit: keyBU === null || keyBU === void 0 ? void 0 : keyBU.dataLimit, dataUsageYesterday: keyBU === null || keyBU === void 0 ? void 0 : keyBU.dataUsageYesterday, dataUsage: keyBU === null || keyBU === void 0 ? void 0 : keyBU.dataUsage, arrayDataUsage: keyBU === null || keyBU === void 0 ? void 0 : keyBU.arrayDataUsage, dataExpand: keyBU === null || keyBU === void 0 ? void 0 : keyBU.dataExpand, userId: keyBU === null || keyBU === void 0 ? void 0 : keyBU.userId, account: keyBU === null || keyBU === void 0 ? void 0 : keyBU.account, startDate: keyBU === null || keyBU === void 0 ? void 0 : keyBU.startDate, endDate: keyBU === null || keyBU === void 0 ? void 0 : keyBU.endDate, createDate: keyBU === null || keyBU === void 0 ? void 0 : keyBU.createDate, migrateDate: keyBU === null || keyBU === void 0 ? void 0 : keyBU.migrateDate, counterMigrate: keyBU === null || keyBU === void 0 ? void 0 : keyBU.counterMigrate }));
            await this.gistModal.create({
                userId: gist === null || gist === void 0 ? void 0 : gist.userId,
                planId: gist === null || gist === void 0 ? void 0 : gist.planId,
                extension: gist === null || gist === void 0 ? void 0 : gist.extension,
                fileName: fileName,
                keyId: key._id,
                code: gist === null || gist === void 0 ? void 0 : gist.code,
                createDate: gist === null || gist === void 0 ? void 0 : gist.createDate,
            });
            return 'success';
        }
        catch (error) {
            throw error;
            console.log(error, 'error');
        }
    }
};
GistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gists_schema_1.Gist.name)),
    __param(1, (0, mongoose_1.InjectModel)(plans_schema_1.Plan.name)),
    __param(2, (0, mongoose_1.InjectModel)(servers_schema_1.Server.name)),
    __param(3, (0, mongoose_1.InjectModel)(keys_schema_1.Key.name)),
    __param(4, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(5, (0, mongoose_1.InjectModel)(transactions_schema_1.Transaction.name)),
    __param(6, (0, mongoose_1.InjectModel)(commisions_schema_1.Commision.name)),
    __param(7, (0, mongoose_1.InjectModel)(roses_schema_1.Rose.name)),
    __param(8, (0, mongoose_1.InjectModel)(collabs_schema_1.Collab.name)),
    __param(9, (0, mongoose_1.InjectModel)(awses_schema_1.Aws.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], GistsService);
exports.GistsService = GistsService;
//# sourceMappingURL=gists.service.js.map