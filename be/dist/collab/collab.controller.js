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
exports.CollabController = void 0;
const common_1 = require("@nestjs/common");
const collab_service_1 = require("./collab.service");
const sync_collab_dto_1 = require("./dto/sync-collab.dto");
let CollabController = class CollabController {
    constructor(collabService) {
        this.collabService = collabService;
    }
    sync(syncCollabDto) {
        return this.collabService.sync(syncCollabDto);
    }
    find() {
        return this.collabService.find();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sync_collab_dto_1.SyncCollabDto]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "sync", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "find", null);
CollabController = __decorate([
    (0, common_1.Controller)('collab'),
    __metadata("design:paramtypes", [collab_service_1.CollabService])
], CollabController);
exports.CollabController = CollabController;
//# sourceMappingURL=collab.controller.js.map