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
exports.ServersController = void 0;
const common_1 = require("@nestjs/common");
const servers_service_1 = require("./servers.service");
const sync_server_dto_1 = require("./dto/sync-server.dto");
const update_location_server_dto_1 = require("./dto/update-location-server.dto");
const update_name_server_dto_1 = require("./dto/update-name-server.dto");
const migrate_server_dto_1 = require("./dto/migrate-server.dto");
const setting_bandwidth_default_dto_1 = require("./dto/setting-bandwidth-default.dto");
const update_remark_server_dto_1 = require("./dto/update-remark-server.dto");
const update_total_bandwidth_server_dto_1 = require("./dto/update-total-bandwidth-server.dto");
const update_status_server_dto_1 = require("./dto/update-status-server.dto");
const update_cloud_manager_dto_1 = require("./dto/update-cloud-manager.dto");
let ServersController = class ServersController {
    constructor(serversService) {
        this.serversService = serversService;
    }
    settingBandWidthDefault(settingBandWidthDefaultDto) {
        return this.serversService.settingBandWidthDefault(settingBandWidthDefaultDto);
    }
    migrate(migrateServerDto) {
        return this.serversService.migrate(migrateServerDto);
    }
    create(syncServerDto) {
        return this.serversService.sync(syncServerDto);
    }
    findSettingBandwidthDefault() {
        return this.serversService.findSettingBandWidthDefault();
    }
    getServerToMigrate(req) {
        return this.serversService.getServerToMigrate(req);
    }
    getNormalServer(req) {
        return this.serversService.getNormalServer(req);
    }
    findAll(req) {
        return this.serversService.findAll(req);
    }
    updateLocation(id, updateLocationServerDto) {
        return this.serversService.updateLocation(id, updateLocationServerDto);
    }
    updateRemark(id, updateRemarkServerDto) {
        return this.serversService.updateRemark(id, updateRemarkServerDto);
    }
    updateTotalBanwidth(id, updateTotalBandwidthServerDto) {
        return this.serversService.updateTotalBanwidth(id, updateTotalBandwidthServerDto);
    }
    updateNameServer(id, updateNameServerDto) {
        return this.serversService.updateNameServer(id, updateNameServerDto);
    }
    updateStautsServer(id, updateStatusServerDto) {
        return this.serversService.updateStautsServer(id, updateStatusServerDto);
    }
    updateCloudManager(id, updateCloudManagerDto) {
        return this.serversService.updateCloudManager(id, updateCloudManagerDto);
    }
    remove(id, req) {
        return this.serversService.remove(id, req);
    }
    cron() {
        return this.serversService.getDataUsage();
    }
    findOne(id) {
        return this.serversService.findOne(id);
    }
};
__decorate([
    (0, common_1.Post)('/setting-bandwidth-default'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setting_bandwidth_default_dto_1.SettingBandWidthDefaultDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "settingBandWidthDefault", null);
__decorate([
    (0, common_1.Post)('/migrate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [migrate_server_dto_1.MigrateServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "migrate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sync_server_dto_1.SyncServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/setting-bandwidth-default'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "findSettingBandwidthDefault", null);
__decorate([
    (0, common_1.Get)('/server-to-migrate'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "getServerToMigrate", null);
__decorate([
    (0, common_1.Get)('/normal-server'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "getNormalServer", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('/location/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_server_dto_1.UpdateLocationServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Patch)('/remark/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_remark_server_dto_1.UpdateRemarkServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "updateRemark", null);
__decorate([
    (0, common_1.Patch)('/total-bandwidth/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_total_bandwidth_server_dto_1.UpdateTotalBandwidthServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "updateTotalBanwidth", null);
__decorate([
    (0, common_1.Patch)('/name-server/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_name_server_dto_1.UpdateNameServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "updateNameServer", null);
__decorate([
    (0, common_1.Patch)('/status-server/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_server_dto_1.UpdateStatusServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "updateStautsServer", null);
__decorate([
    (0, common_1.Patch)('/cloud-manager/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cloud_manager_dto_1.UpdateCloudManagerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "updateCloudManager", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/cron'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "cron", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "findOne", null);
ServersController = __decorate([
    (0, common_1.Controller)('servers'),
    __metadata("design:paramtypes", [servers_service_1.ServersService])
], ServersController);
exports.ServersController = ServersController;
//# sourceMappingURL=servers.controller.js.map