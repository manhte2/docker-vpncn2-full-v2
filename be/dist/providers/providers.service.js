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
exports.ProvidersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const providers_schema_1 = require("../schemas/providers.schema");
const mongoose_2 = require("@nestjs/mongoose");
let ProvidersService = class ProvidersService {
    constructor(providerModal) {
        this.providerModal = providerModal;
    }
    async create(createProviderDto) {
        try {
            return await this.providerModal.create(Object.assign({}, createProviderDto));
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        return await this.providerModal.find({ status: 1 });
    }
    async findOne(id) {
        try {
            return await this.providerModal.findById(id);
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateProviderDto) {
        try {
            return await this.providerModal.findByIdAndUpdate(id, updateProviderDto, {
                new: true,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.providerModal.findByIdAndUpdate(id, { status: 0 });
        }
        catch (error) {
            throw error;
        }
    }
};
ProvidersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(providers_schema_1.Provider.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProvidersService);
exports.ProvidersService = ProvidersService;
//# sourceMappingURL=providers.service.js.map