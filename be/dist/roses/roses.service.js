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
exports.RosesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const roses_schema_1 = require("../schemas/roses.schema");
const mongoose_2 = require("mongoose");
let RosesService = class RosesService {
    constructor(roseModal) {
        this.roseModal = roseModal;
    }
    async findAll(req) {
        var _a;
        try {
            let query = {};
            query = Object.assign({}, (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.reciveRoseId) && {
                reciveRoseId: req.query.reciveRoseId,
            }));
            return this.roseModal
                .find(query)
                .populate('reciveRoseId')
                .populate('introducedId')
                .sort({ createdAt: -1 });
        }
        catch (error) {
            throw error;
        }
    }
};
RosesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(roses_schema_1.Rose.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RosesService);
exports.RosesService = RosesService;
//# sourceMappingURL=roses.service.js.map