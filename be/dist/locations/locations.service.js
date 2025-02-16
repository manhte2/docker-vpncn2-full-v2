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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const locations_schema_1 = require("../schemas/locations.schema");
let LocationsService = class LocationsService {
    constructor(locationModal) {
        this.locationModal = locationModal;
    }
    async create(createLocationDto) {
        try {
            const data = await this.locationModal.create(createLocationDto);
            return { message: 'Tạo location thành công', data };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            return this.locationModal.find();
        }
        catch (err) {
            throw err;
        }
    }
    async findOne(id) {
        try {
            return await this.locationModal.findById(id);
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, updateLocationDto) {
        try {
            const data = await this.locationModal.findByIdAndUpdate(id, updateLocationDto, { new: true });
            return {
                messgae: 'Cập nhật thành công',
                data,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.locationModal.findByIdAndDelete(id);
            return { message: 'Xoá location thành công' };
        }
        catch (error) {
            throw error;
        }
    }
};
LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(locations_schema_1.Location.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LocationsService);
exports.LocationsService = LocationsService;
//# sourceMappingURL=locations.service.js.map