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
exports.KumaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const servers_schema_1 = require("../schemas/servers.schema");
const keys_schema_1 = require("../schemas/keys.schema");
const mongoose_2 = require("mongoose");
const keys_service_1 = require("../keys/keys.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const axios_1 = require("@nestjs/axios");
const DOWN = 'Down';
let KumaService = class KumaService {
    constructor(configService, keyService, keyModal, serverModal, kumaMonitorQueue, httpService) {
        this.configService = configService;
        this.keyService = keyService;
        this.keyModal = keyModal;
        this.serverModal = serverModal;
        this.kumaMonitorQueue = kumaMonitorQueue;
        this.httpService = httpService;
    }
    extractInfo(data) {
        const msgPattern = /^\[([cm][^\]]*)\] \[(🔴|✅) (Down|Up)\]/;
        const match = data.msg.match(msgPattern);
        if (match) {
            const status = match[3];
            return {
                hostname: data.hostname,
                status: status,
            };
        }
        else {
            return null;
        }
    }
    async monitor(monitorKumaDto) {
        var _a, _b;
        try {
            const kumaBody = {
                hostname: (_a = monitorKumaDto === null || monitorKumaDto === void 0 ? void 0 : monitorKumaDto.monitor) === null || _a === void 0 ? void 0 : _a.hostname,
                port: (_b = monitorKumaDto === null || monitorKumaDto === void 0 ? void 0 : monitorKumaDto.monitor) === null || _b === void 0 ? void 0 : _b.port,
                msg: monitorKumaDto === null || monitorKumaDto === void 0 ? void 0 : monitorKumaDto.msg,
            };
            const result = this.extractInfo(kumaBody);
            const amountQueueWating = await this.kumaMonitorQueue.count();
            if (amountQueueWating > 200) {
                await this.kumaMonitorQueue.clean(0, 100, 'wait');
            }
            await this.kumaMonitorQueue.add('kuma-monitor', {
                data: result,
            });
            return 'This action adds a new kuma';
        }
        catch (error) {
            console.log(error);
        }
    }
    async test() {
        try {
        }
        catch (error) {
            throw error;
        }
    }
    async _handleMonitorCore(result) {
        var _a, _b, _c;
        try {
            if (result && result.status === DOWN) {
                const downServer = await this.serverModal.findOne({
                    hostnameForAccessKeys: result.hostname,
                });
                if (downServer.status == 2)
                    return;
                await this.serverModal.findOneAndUpdate({
                    hostnameForAccessKeys: result.hostname,
                }, { status: 2 });
                let maintainServer;
                const serverSameLocation = await this.serverModal.findOne({
                    status: 3,
                    location: downServer.location,
                });
                if (serverSameLocation) {
                    maintainServer = serverSameLocation;
                }
                else {
                    const listServer = await this.serverModal.aggregate([
                        {
                            $match: {
                                status: 3,
                            },
                        },
                        {
                            $lookup: {
                                from: 'keys',
                                localField: '_id',
                                foreignField: 'serverId',
                                as: 'keys',
                                pipeline: [
                                    {
                                        $match: { status: 1 },
                                    },
                                ],
                            },
                        },
                        {
                            $addFields: {
                                keyCount: { $size: '$keys' },
                            },
                        },
                        {
                            $sort: { keyCount: 1 },
                        },
                        {
                            $limit: 1,
                        },
                    ]);
                    maintainServer = listServer[0];
                }
                if (maintainServer) {
                    const listKey = await this.keyModal.find({
                        serverId: (_a = downServer === null || downServer === void 0 ? void 0 : downServer._id) === null || _a === void 0 ? void 0 : _a.toString(),
                        status: 1,
                    });
                    for (const key of listKey) {
                        await this.keyService.migrate({
                            keyId: (_b = key._id) === null || _b === void 0 ? void 0 : _b.toString(),
                            serverId: (_c = maintainServer === null || maintainServer === void 0 ? void 0 : maintainServer._id) === null || _c === void 0 ? void 0 : _c.toString(),
                        });
                    }
                }
                else {
                    console.log('not found maintain server');
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async create(createKumaDto) {
        const formData = new FormData();
        formData.append('username', this.configService.get('KUMA_USERNAME'));
        formData.append('password', this.configService.get('KUMA_PASSWORD'));
        try {
            const res = await this.httpService.axiosRef.post(this.configService.get('KUMA_DOMAIN') + '/login/access-token', formData);
            const token = res.data.access_token;
            const payloadC = {
                type: 'port',
                name: `c-${createKumaDto.name}-${createKumaDto.hostname}`,
                interval: 30,
                retryInterval: 30,
                resendInterval: 0,
                maxretries: 6,
                upsideDown: false,
                url: 'https://',
                expiryNotification: false,
                ignoreTls: false,
                maxredirects: 10,
                port: createKumaDto.portC,
                accepted_statuscodes: ['200-299'],
                notificationIDList: [1, 2],
                method: 'GET',
                authMethod: 'basic',
                hostname: createKumaDto.hostname,
                dns_resolve_server: '1.1.1.1',
                dns_resolve_type: 'A',
                mqttUsername: '',
                mqttPassword: '',
            };
            const payloadP = {
                type: 'ping',
                name: `p-${createKumaDto.name}-${createKumaDto.hostname}`,
                interval: 30,
                retryInterval: 30,
                resendInterval: 0,
                maxretries: 6,
                upsideDown: false,
                url: 'https://',
                expiryNotification: false,
                ignoreTls: false,
                maxredirects: 10,
                accepted_statuscodes: ['200-299'],
                method: 'GET',
                authMethod: 'basic',
                hostname: createKumaDto.hostname,
                dns_resolve_server: '1.1.1.1',
                dns_resolve_type: 'A',
                mqttUsername: '',
                mqttPassword: '',
            };
            const monitorResC = await this.httpService.axiosRef.post(this.configService.get('KUMA_DOMAIN') + '/monitors', payloadC, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const monitorResP = await this.httpService.axiosRef.post(this.configService.get('KUMA_DOMAIN') + '/monitors', payloadP, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            await this.serverModal.findOneAndUpdate({
                hostnameForAccessKeys: createKumaDto.hostname,
                status: createKumaDto.status,
            }, {
                monitorId: [monitorResC.data.monitorID, monitorResP.data.monitorID],
                isConnectKuma: 1,
            });
            return 'create kuma monitor successfully';
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    findAll() {
        return `This action returns all kuma`;
    }
    findOne(id) {
        return `This action returns a #${id} kuma`;
    }
    update(id, updateKumaDto) {
        return `This action updates a #${id} kuma`;
    }
    async remove(removeKumaDto) {
        try {
            const server = await this.serverModal.findById(removeKumaDto.id);
            const listMonitorId = server.monitorId;
            const formData = new FormData();
            formData.append('username', this.configService.get('KUMA_USERNAME'));
            formData.append('password', this.configService.get('KUMA_PASSWORD'));
            const res = await this.httpService.axiosRef.post(this.configService.get('KUMA_DOMAIN') + '/login/access-token', formData);
            const token = res.data.access_token;
            await this.httpService.axiosRef.delete(this.configService.get('KUMA_DOMAIN') + `/monitors/${listMonitorId[0]}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            await this.httpService.axiosRef.delete(this.configService.get('KUMA_DOMAIN') + `/monitors/${listMonitorId[1]}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            await this.serverModal.findByIdAndUpdate(removeKumaDto.id, {
                monitorId: [],
                isConnectKuma: 0,
            });
            return 'remove monitoring successfully';
        }
        catch (error) {
            console.log(error);
        }
    }
};
KumaService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(keys_schema_1.Key.name)),
    __param(3, (0, mongoose_1.InjectModel)(servers_schema_1.Server.name)),
    __param(4, (0, bullmq_1.InjectQueue)('kuma-monitor')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        keys_service_1.KeysService,
        mongoose_2.Model,
        mongoose_2.Model,
        bullmq_2.Queue,
        axios_1.HttpService])
], KumaService);
exports.KumaService = KumaService;
//# sourceMappingURL=kuma.service.js.map