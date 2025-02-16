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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersModule = void 0;
const common_1 = require("@nestjs/common");
const servers_service_1 = require("./servers.service");
const servers_controller_1 = require("./servers.controller");
const servers_schema_1 = require("../schemas/servers.schema");
const mongoose_1 = require("@nestjs/mongoose");
const keys_schema_1 = require("../schemas/keys.schema");
const gists_schema_1 = require("../schemas/gists.schema");
const awses_schema_1 = require("../schemas/awses.schema");
const keys_service_1 = require("../keys/keys.service");
const plans_schema_1 = require("../schemas/plans.schema");
const users_schema_1 = require("../schemas/users.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const collabs_schema_1 = require("../schemas/collabs.schema");
const tests_schema_1 = require("../schemas/tests.schema");
const settingBandwidths_schema_1 = require("../schemas/settingBandwidths.schema");
const kuma_service_1 = require("../kuma/kuma.service");
const bullmq_1 = require("@nestjs/bullmq");
const servers_consumer_1 = require("./servers.consumer");
const axios_1 = require("@nestjs/axios");
let ServersModule = class ServersModule {
    constructor(serversService) {
        this.serversService = serversService;
    }
    async onModuleInit() {
        await this.serversService.createDefaulBandWidth();
    }
};
ServersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            mongoose_1.MongooseModule.forFeature([{ name: servers_schema_1.Server.name, schema: servers_schema_1.ServerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: keys_schema_1.Key.name, schema: keys_schema_1.KeySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: gists_schema_1.Gist.name, schema: gists_schema_1.GistSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: awses_schema_1.Aws.name, schema: awses_schema_1.AWSSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: plans_schema_1.Plan.name, schema: plans_schema_1.PlanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: tests_schema_1.Test.name, schema: tests_schema_1.TestSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: settingBandwidths_schema_1.SettingBandwidth.name, schema: settingBandwidths_schema_1.SettingBandwidthSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: transactions_schema_1.Transaction.name, schema: transactions_schema_1.TransactionSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: collabs_schema_1.Collab.name, schema: collabs_schema_1.CollabSchema }]),
            bullmq_1.BullModule.registerQueue({
                name: 'data-usage',
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'expried-key',
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'expried-data-expand-key',
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'kuma-monitor',
            }),
        ],
        controllers: [servers_controller_1.ServersController],
        providers: [servers_service_1.ServersService, keys_service_1.KeysService, kuma_service_1.KumaService, servers_consumer_1.DataUsageConsumer],
    }),
    __metadata("design:paramtypes", [servers_service_1.ServersService])
], ServersModule);
exports.ServersModule = ServersModule;
//# sourceMappingURL=servers.module.js.map