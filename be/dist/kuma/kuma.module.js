"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KumaModule = void 0;
const common_1 = require("@nestjs/common");
const kuma_service_1 = require("./kuma.service");
const kuma_controller_1 = require("./kuma.controller");
const mongoose_1 = require("@nestjs/mongoose");
const servers_schema_1 = require("../schemas/servers.schema");
const keys_schema_1 = require("../schemas/keys.schema");
const keys_service_1 = require("../keys/keys.service");
const gists_schema_1 = require("../schemas/gists.schema");
const awses_schema_1 = require("../schemas/awses.schema");
const plans_schema_1 = require("../schemas/plans.schema");
const users_schema_1 = require("../schemas/users.schema");
const tests_schema_1 = require("../schemas/tests.schema");
const settingBandwidths_schema_1 = require("../schemas/settingBandwidths.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const collabs_schema_1 = require("../schemas/collabs.schema");
const bullmq_1 = require("@nestjs/bullmq");
const kuma_consumer_1 = require("./kuma.consumer");
const axios_1 = require("@nestjs/axios");
let KumaModule = class KumaModule {
};
KumaModule = __decorate([
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
                name: 'expried-key',
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'expried-data-expand-key',
            }),
            bullmq_1.BullModule.registerQueue({
                name: 'kuma-monitor',
            }),
        ],
        controllers: [kuma_controller_1.KumaController],
        providers: [kuma_service_1.KumaService, keys_service_1.KeysService, kuma_consumer_1.KumaMonitorConsumer],
    })
], KumaModule);
exports.KumaModule = KumaModule;
//# sourceMappingURL=kuma.module.js.map