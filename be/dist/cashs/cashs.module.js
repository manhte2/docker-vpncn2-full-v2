"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashsModule = void 0;
const common_1 = require("@nestjs/common");
const cashs_service_1 = require("./cashs.service");
const cashs_controller_1 = require("./cashs.controller");
const mongoose_1 = require("@nestjs/mongoose");
const cashs_schema_1 = require("../schemas/cashs.schema");
const users_schema_1 = require("../schemas/users.schema");
let CashsModule = class CashsModule {
};
CashsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cashs_schema_1.Cash.name, schema: cashs_schema_1.CashSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
        ],
        controllers: [cashs_controller_1.CashsController],
        providers: [cashs_service_1.CashsService],
    })
], CashsModule);
exports.CashsModule = CashsModule;
//# sourceMappingURL=cashs.module.js.map