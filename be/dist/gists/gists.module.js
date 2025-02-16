"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistsModule = void 0;
const common_1 = require("@nestjs/common");
const gists_service_1 = require("./gists.service");
const gists_controller_1 = require("./gists.controller");
const gists_schema_1 = require("../schemas/gists.schema");
const mongoose_1 = require("@nestjs/mongoose");
const plans_schema_1 = require("../schemas/plans.schema");
const servers_schema_1 = require("../schemas/servers.schema");
const keys_schema_1 = require("../schemas/keys.schema");
const users_schema_1 = require("../schemas/users.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const commisions_schema_1 = require("../schemas/commisions.schema");
const roses_schema_1 = require("../schemas/roses.schema");
const collabs_schema_1 = require("../schemas/collabs.schema");
const awses_schema_1 = require("../schemas/awses.schema");
let GistsModule = class GistsModule {
};
GistsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: gists_schema_1.Gist.name, schema: gists_schema_1.GistSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: plans_schema_1.Plan.name, schema: plans_schema_1.PlanSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: servers_schema_1.Server.name, schema: servers_schema_1.ServerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: keys_schema_1.Key.name, schema: keys_schema_1.KeySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: commisions_schema_1.Commision.name, schema: commisions_schema_1.CommisionSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: roses_schema_1.Rose.name, schema: roses_schema_1.RoseSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: collabs_schema_1.Collab.name, schema: collabs_schema_1.CollabSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: awses_schema_1.Aws.name, schema: awses_schema_1.AWSSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: transactions_schema_1.Transaction.name, schema: transactions_schema_1.TransactionSchema },
            ]),
        ],
        controllers: [gists_controller_1.GistsController],
        providers: [gists_service_1.GistsService],
    })
], GistsModule);
exports.GistsModule = GistsModule;
//# sourceMappingURL=gists.module.js.map