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
exports.KeysController = void 0;
const common_1 = require("@nestjs/common");
const keys_service_1 = require("./keys.service");
const create_key_dto_1 = require("./dto/create-key.dto");
const migrate_key_dto_1 = require("./dto/migrate-key.dto");
const add_data_limit_key_dto_1 = require("./dto/add-data-limit-key.dto");
const rename_key_dto_1 = require("./dto/rename-key.dto");
const multi_migrate_key_dto_1 = require("./dto/multi-migrate-key.dto");
const end_date_key_dto_1 = require("./dto/end-date-key.dto");
let KeysController = class KeysController {
    constructor(keysService) {
        this.keysService = keysService;
    }
    test() {
        return this.keysService.test();
    }
    multiMigrate(multiMigrateKeyDto) {
        return this.keysService.multiMigrate(multiMigrateKeyDto);
    }
    migrate(migrateKeyDto) {
        return this.keysService.migrate(migrateKeyDto);
    }
    create(createKeyDto) {
        return this.keysService.create(createKeyDto);
    }
    todayInfo() {
        return this.keysService.todayInfo();
    }
    findAllWithOutlineDataUsage(req) {
        return this.keysService.findAllWithOutlineDataUsage(req);
    }
    findAll(req) {
        return this.keysService.findAll(req);
    }
    disable(id) {
        return this.keysService.disableByAdmin(id);
    }
    enable(id) {
        return this.keysService.enableByAdmin(id);
    }
    addDataLimit(id, addDataLimitKey) {
        return this.keysService.addDataLimit(id, addDataLimitKey);
    }
    updateEndDate(id, endDateKeyDto) {
        return this.keysService.updateEndDate(id, endDateKeyDto);
    }
    cron() {
        return this.keysService.checkExpireDataExpandKey();
    }
    findOne(id) {
        return this.keysService.findOne(id);
    }
    upgrade(id) {
        return this.keysService.upgrade(id);
    }
    rename(id, renameKeyDto) {
        return this.keysService.rename(id, renameKeyDto);
    }
    remove(id) {
        return this.keysService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('/multi-migrate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [multi_migrate_key_dto_1.MultiMigrateKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "multiMigrate", null);
__decorate([
    (0, common_1.Post)('/migrate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [migrate_key_dto_1.MigrateKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "migrate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_key_dto_1.CreateKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/today-info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "todayInfo", null);
__decorate([
    (0, common_1.Get)('/outline-data-usage'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "findAllWithOutlineDataUsage", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/disable/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "disable", null);
__decorate([
    (0, common_1.Get)('/enable/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "enable", null);
__decorate([
    (0, common_1.Patch)('/add-data-limit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_data_limit_key_dto_1.AddDataLimitKey]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "addDataLimit", null);
__decorate([
    (0, common_1.Patch)('/end-date/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, end_date_key_dto_1.EndDateKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "updateEndDate", null);
__decorate([
    (0, common_1.Get)('/cron'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "cron", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/upgrade/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "upgrade", null);
__decorate([
    (0, common_1.Patch)('/rename/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rename_key_dto_1.RenameKeyDto]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "rename", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KeysController.prototype, "remove", null);
KeysController = __decorate([
    (0, common_1.Controller)('keys'),
    __metadata("design:paramtypes", [keys_service_1.KeysService])
], KeysController);
exports.KeysController = KeysController;
//# sourceMappingURL=keys.controller.js.map