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
exports.CollabService = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const collabs_schema_1 = require("../schemas/collabs.schema");
const mongoose_2 = require("mongoose");
let CollabService = class CollabService {
    constructor(collabModal, configService) {
        this.collabModal = collabModal;
        this.configService = configService;
    }
    async createDefaulCollab() {
        try {
            const collab = await this.collabModal.findOne();
            if (collab)
                return;
            await this.collabModal.create({
                level1: this.configService.get('LEVEL1'),
                level2: this.configService.get('LEVEL2'),
                level3: this.configService.get('LEVEL3'),
            });
        }
        catch (error) {
            throw error;
        }
    }
    async sync(syncCollabDto) {
        try {
            const collab = await this.collabModal.findOne({});
            if (collab) {
                await this.collabModal.findByIdAndUpdate(collab._id, syncCollabDto);
            }
            else {
                await this.collabModal.create(syncCollabDto);
            }
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Đồng bộ thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async find() {
        try {
            return await this.collabModal.findOne();
        }
        catch (error) {
            throw error;
        }
    }
};
CollabService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(collabs_schema_1.Collab.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], CollabService);
exports.CollabService = CollabService;
//# sourceMappingURL=collab.service.js.map