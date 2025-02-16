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
exports.CommisionsModule = void 0;
const common_1 = require("@nestjs/common");
const commisions_service_1 = require("./commisions.service");
const commisions_controller_1 = require("./commisions.controller");
const mongoose_1 = require("@nestjs/mongoose");
const commisions_schema_1 = require("../schemas/commisions.schema");
let CommisionsModule = class CommisionsModule {
    constructor(commisionsService) {
        this.commisionsService = commisionsService;
    }
    async onModuleInit() {
        await this.commisionsService.createDefaultCommision();
    }
};
CommisionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: commisions_schema_1.Commision.name, schema: commisions_schema_1.CommisionSchema },
            ]),
        ],
        controllers: [commisions_controller_1.CommisionsController],
        providers: [commisions_service_1.CommisionsService],
    }),
    __metadata("design:paramtypes", [commisions_service_1.CommisionsService])
], CommisionsModule);
exports.CommisionsModule = CommisionsModule;
//# sourceMappingURL=commisions.module.js.map