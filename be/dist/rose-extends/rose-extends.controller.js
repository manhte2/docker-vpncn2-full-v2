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
exports.RoseExtendsController = void 0;
const common_1 = require("@nestjs/common");
const rose_extends_service_1 = require("./rose-extends.service");
const sync_rose_extend_dto_1 = require("./dto/sync-rose-extend.dto");
let RoseExtendsController = class RoseExtendsController {
    constructor(roseExtendsService) {
        this.roseExtendsService = roseExtendsService;
    }
    sync(syncRoseExtendDto) {
        return this.roseExtendsService.sync(syncRoseExtendDto);
    }
    find() {
        return this.roseExtendsService.find();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sync_rose_extend_dto_1.SyncRoseExtendDto]),
    __metadata("design:returntype", void 0)
], RoseExtendsController.prototype, "sync", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoseExtendsController.prototype, "find", null);
RoseExtendsController = __decorate([
    (0, common_1.Controller)('rose-extends'),
    __metadata("design:paramtypes", [rose_extends_service_1.RoseExtendsService])
], RoseExtendsController);
exports.RoseExtendsController = RoseExtendsController;
//# sourceMappingURL=rose-extends.controller.js.map