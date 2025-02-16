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
exports.CommisionsService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const commisions_schema_1 = require("../schemas/commisions.schema");
const mongoose_2 = require("mongoose");
let CommisionsService = class CommisionsService {
    constructor(commisionModal, configService) {
        this.commisionModal = commisionModal;
        this.configService = configService;
    }
    async createDefaultCommision() {
        try {
            const commision = await this.commisionModal.findOne();
            if (commision)
                return;
            await this.commisionModal.create({
                value: this.configService.get('COMMISION'),
            });
        }
        catch (error) {
            throw error;
        }
    }
    async sync(syncCommisionDto) {
        const commision = await this.commisionModal.findOne({});
        if (commision) {
            await this.commisionModal.findByIdAndUpdate(commision._id, syncCommisionDto);
        }
        else {
            await this.commisionModal.create(syncCommisionDto);
        }
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'thành công ',
        };
    }
    async find() {
        try {
            return await this.commisionModal.findOne();
        }
        catch (error) {
            throw error;
        }
    }
};
CommisionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(commisions_schema_1.Commision.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], CommisionsService);
exports.CommisionsService = CommisionsService;
//# sourceMappingURL=commisions.service.js.map