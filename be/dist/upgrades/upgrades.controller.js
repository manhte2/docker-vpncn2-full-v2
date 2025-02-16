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
exports.UpgradesController = void 0;
const common_1 = require("@nestjs/common");
const upgrades_service_1 = require("./upgrades.service");
const update_upgrade_dto_1 = require("./dto/update-upgrade.dto");
const band_width_upgrade_dto_1 = require("./dto/band-width-upgrade.dto");
const plan_upgrade_dto_1 = require("./dto/plan-upgrade.dto");
let UpgradesController = class UpgradesController {
    constructor(upgradesService) {
        this.upgradesService = upgradesService;
    }
    upgradeBandwidth(bandWidthUpgradeDto) {
        return this.upgradesService.upgradeBandwidth(bandWidthUpgradeDto);
    }
    upgradePlan(planUpgradeDto) {
        return this.upgradesService.upgradePlan(planUpgradeDto);
    }
    findAll() {
        return this.upgradesService.findAll();
    }
    findOne(id) {
        return this.upgradesService.findOne(+id);
    }
    update(id, updateUpgradeDto) {
        return this.upgradesService.update(+id, updateUpgradeDto);
    }
    remove(id) {
        return this.upgradesService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('band-width'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [band_width_upgrade_dto_1.BandWidthUpgradeDto]),
    __metadata("design:returntype", void 0)
], UpgradesController.prototype, "upgradeBandwidth", null);
__decorate([
    (0, common_1.Post)('/plan'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_upgrade_dto_1.PlanUpgradeDto]),
    __metadata("design:returntype", void 0)
], UpgradesController.prototype, "upgradePlan", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UpgradesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UpgradesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_upgrade_dto_1.UpdateUpgradeDto]),
    __metadata("design:returntype", void 0)
], UpgradesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UpgradesController.prototype, "remove", null);
UpgradesController = __decorate([
    (0, common_1.Controller)('upgrades'),
    __metadata("design:paramtypes", [upgrades_service_1.UpgradesService])
], UpgradesController);
exports.UpgradesController = UpgradesController;
//# sourceMappingURL=upgrades.controller.js.map