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
exports.GistsController = void 0;
const update_extension_gist_dto_1 = require("./dto/update-extension-gist.dto");
const common_1 = require("@nestjs/common");
const gists_service_1 = require("./gists.service");
const create_gist_dto_1 = require("./dto/create-gist.dto");
const back_gist_dto_1 = require("./dto/back-gist.dto");
let GistsController = class GistsController {
    constructor(gistsService) {
        this.gistsService = gistsService;
    }
    backup(backUpGistDto) {
        return this.gistsService.backUp(backUpGistDto);
    }
    create(createGistDto) {
        return this.gistsService.create(createGistDto);
    }
    findAll(req) {
        return this.gistsService.findAll(req);
    }
    findOne(id) {
        return this.gistsService.findOne(id);
    }
    updateExtension(id, updateExtensionGistDto) {
        return this.gistsService.updateExtension(id, updateExtensionGistDto);
    }
    remove(id) {
        return this.gistsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)('/back-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [back_gist_dto_1.BackUpGistDto]),
    __metadata("design:returntype", void 0)
], GistsController.prototype, "backup", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_gist_dto_1.CreateGistDto]),
    __metadata("design:returntype", void 0)
], GistsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GistsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/extension/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_extension_gist_dto_1.UpdateExtensionGistDto]),
    __metadata("design:returntype", void 0)
], GistsController.prototype, "updateExtension", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GistsController.prototype, "remove", null);
GistsController = __decorate([
    (0, common_1.Controller)('gists'),
    __metadata("design:paramtypes", [gists_service_1.GistsService])
], GistsController);
exports.GistsController = GistsController;
//# sourceMappingURL=gists.controller.js.map