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
exports.CommisionsController = void 0;
const common_1 = require("@nestjs/common");
const commisions_service_1 = require("./commisions.service");
const sync_commision_dto_1 = require("./dto/sync-commision.dto");
let CommisionsController = class CommisionsController {
    constructor(commisionsService) {
        this.commisionsService = commisionsService;
    }
    sync(syncCommisionDto) {
        return this.commisionsService.sync(syncCommisionDto);
    }
    find() {
        return this.commisionsService.find();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sync_commision_dto_1.SyncCommisionDto]),
    __metadata("design:returntype", void 0)
], CommisionsController.prototype, "sync", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommisionsController.prototype, "find", null);
CommisionsController = __decorate([
    (0, common_1.Controller)('commisions'),
    __metadata("design:paramtypes", [commisions_service_1.CommisionsService])
], CommisionsController);
exports.CommisionsController = CommisionsController;
//# sourceMappingURL=commisions.controller.js.map