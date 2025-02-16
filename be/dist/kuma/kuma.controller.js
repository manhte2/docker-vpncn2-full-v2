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
exports.KumaController = void 0;
const common_1 = require("@nestjs/common");
const kuma_service_1 = require("./kuma.service");
const update_kuma_dto_1 = require("./dto/update-kuma.dto");
const create_kuma_dto_1 = require("./dto/create-kuma.dto");
const remove_kuma_dto_1 = require("./dto/remove-kuma.dto");
let KumaController = class KumaController {
    constructor(kumaService) {
        this.kumaService = kumaService;
    }
    monitor(monitorKumaDto) {
        return this.kumaService.monitor(monitorKumaDto);
    }
    create(createKumaDto) {
        return this.kumaService.create(createKumaDto);
    }
    test() {
        return this.kumaService.test();
    }
    findAll() {
        return this.kumaService.findAll();
    }
    findOne(id) {
        return this.kumaService.findOne(+id);
    }
    update(id, updateKumaDto) {
        return this.kumaService.update(+id, updateKumaDto);
    }
    remove(removeKumaDto) {
        return this.kumaService.remove(removeKumaDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KumaController.prototype, "monitor", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_kuma_dto_1.CreateKumaDto]),
    __metadata("design:returntype", void 0)
], KumaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KumaController.prototype, "test", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KumaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KumaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_kuma_dto_1.UpdateKumaDto]),
    __metadata("design:returntype", void 0)
], KumaController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_kuma_dto_1.RemoveKumaDto]),
    __metadata("design:returntype", void 0)
], KumaController.prototype, "remove", null);
KumaController = __decorate([
    (0, common_1.Controller)('kuma'),
    __metadata("design:paramtypes", [kuma_service_1.KumaService])
], KumaController);
exports.KumaController = KumaController;
//# sourceMappingURL=kuma.controller.js.map