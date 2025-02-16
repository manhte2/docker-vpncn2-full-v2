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
exports.ClouldsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const clouds_schema_1 = require("../schemas/clouds.schema");
const mongoose_2 = require("mongoose");
let ClouldsService = class ClouldsService {
    constructor(cloudModal) {
        this.cloudModal = cloudModal;
    }
    async create(createClouldDto) {
        try {
            return await this.cloudModal.create(Object.assign({}, createClouldDto));
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.cloudModal.find({ status: 1 });
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            return await this.cloudModal.findById(id);
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateClouldDto) {
        try {
            return await this.cloudModal.findByIdAndUpdate(id, updateClouldDto, {
                new: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.cloudModal.findByIdAndUpdate(id, { status: 0 });
        }
        catch (error) {
            throw error;
        }
    }
};
ClouldsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(clouds_schema_1.Cloud.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClouldsService);
exports.ClouldsService = ClouldsService;
//# sourceMappingURL=cloulds.service.js.map