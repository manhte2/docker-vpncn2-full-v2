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
exports.RoseExtendsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const roseExtends_schema_1 = require("../schemas/roseExtends.schema");
const mongoose_2 = require("mongoose");
let RoseExtendsService = class RoseExtendsService {
    constructor(roseExtendModal, configService) {
        this.roseExtendModal = roseExtendModal;
        this.configService = configService;
    }
    async createDefaultRoseExtend() {
        try {
            const commision = await this.roseExtendModal.findOne();
            if (commision)
                return;
            await this.roseExtendModal.create({
                level1: this.configService.get('ROSE_EXTEND_1'),
                level2: this.configService.get('ROSE_EXTEND_2'),
                level3: this.configService.get('ROSE_EXTEND_3'),
            });
        }
        catch (error) {
            throw error;
        }
    }
    async sync(syncRoseExtendDto) {
        const roseExtend = await this.roseExtendModal.findOne({});
        if (roseExtend) {
            await this.roseExtendModal.findByIdAndUpdate(roseExtend._id, syncRoseExtendDto);
        }
        else {
            await this.roseExtendModal.create(syncRoseExtendDto);
        }
        return {
            status: common_1.HttpStatus.CREATED,
            message: 'thành công ',
        };
    }
    async find() {
        try {
            return await this.roseExtendModal.findOne();
        }
        catch (error) {
            throw error;
        }
    }
};
RoseExtendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(roseExtends_schema_1.RoseExtend.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], RoseExtendsService);
exports.RoseExtendsService = RoseExtendsService;
//# sourceMappingURL=rose-extends.service.js.map