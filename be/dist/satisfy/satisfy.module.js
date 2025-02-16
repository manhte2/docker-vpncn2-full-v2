"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfyModule = void 0;
const common_1 = require("@nestjs/common");
const satisfy_service_1 = require("./satisfy.service");
const satisfy_controller_1 = require("./satisfy.controller");
const mongoose_1 = require("@nestjs/mongoose");
const cashs_schema_1 = require("../schemas/cashs.schema");
const roses_schema_1 = require("../schemas/roses.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const users_schema_1 = require("../schemas/users.schema");
const servers_schema_1 = require("../schemas/servers.schema");
const keys_schema_1 = require("../schemas/keys.schema");
let SatisfyModule = class SatisfyModule {
};
SatisfyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cashs_schema_1.Cash.name, schema: cashs_schema_1.CashSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: roses_schema_1.Rose.name, schema: roses_schema_1.RoseSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: servers_schema_1.Server.name, schema: servers_schema_1.ServerSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: keys_schema_1.Key.name, schema: keys_schema_1.KeySchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: transactions_schema_1.Transaction.name, schema: transactions_schema_1.TransactionSchema },
            ]),
        ],
        controllers: [satisfy_controller_1.SatisfyController],
        providers: [satisfy_service_1.SatisfyService],
    })
], SatisfyModule);
exports.SatisfyModule = SatisfyModule;
//# sourceMappingURL=satisfy.module.js.map