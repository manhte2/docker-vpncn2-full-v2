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
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("../schemas/users.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const cashs_schema_1 = require("../schemas/cashs.schema");
const jwt_1 = require("@nestjs/jwt");
let UsersModule = class UsersModule {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async onModuleInit() {
        await this.usersService.createDefaultAdmin();
    }
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: transactions_schema_1.Transaction.name, schema: transactions_schema_1.TransactionSchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: cashs_schema_1.Cash.name, schema: cashs_schema_1.CashSchema }]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, jwt_1.JwtService],
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map