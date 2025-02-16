"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendPlansModule = void 0;
const common_1 = require("@nestjs/common");
const extend_plans_service_1 = require("./extend-plans.service");
const extend_plans_controller_1 = require("./extend-plans.controller");
const mongoose_1 = require("@nestjs/mongoose");
const extendPlans_schema_1 = require("../schemas/extendPlans.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
let ExtendPlansModule = class ExtendPlansModule {
};
ExtendPlansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: extendPlans_schema_1.ExtendPlan.name, schema: extendPlans_schema_1.ExtendPlanSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                { name: transactions_schema_1.Transaction.name, schema: transactions_schema_1.TransactionSchema },
            ]),
        ],
        controllers: [extend_plans_controller_1.ExtendPlansController],
        providers: [extend_plans_service_1.ExtendPlansService],
    })
], ExtendPlansModule);
exports.ExtendPlansModule = ExtendPlansModule;
//# sourceMappingURL=extend-plans.module.js.map