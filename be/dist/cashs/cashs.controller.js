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
exports.CashsController = void 0;
const common_1 = require("@nestjs/common");
const cashs_service_1 = require("./cashs.service");
const create_cash_dto_1 = require("./dto/create-cash.dto");
const reject_cash_dto_1 = require("./dto/reject-cash.dto");
const cash_by_admin_dto_1 = require("./dto/cash-by-admin.dto");
let CashsController = class CashsController {
    constructor(cashsService) {
        this.cashsService = cashsService;
    }
    autoBank(createCashDto) {
        return this.cashsService.autoBank(createCashDto);
    }
    cashByAdmin(cashByAdminDto) {
        return this.cashsService.cashByAdmin(cashByAdminDto);
    }
    create(createCashDto) {
        return this.cashsService.create(createCashDto);
    }
    findAll(req) {
        return this.cashsService.findAll(req);
    }
    approve(id) {
        return this.cashsService.approve(id);
    }
    reject(id, rejectCashDto) {
        return this.cashsService.reject(id, rejectCashDto);
    }
    remove(id) {
        return this.cashsService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)('/auto-bank'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cash_dto_1.CreateCashDto]),
    __metadata("design:returntype", void 0)
], CashsController.prototype, "autoBank", null);
__decorate([
    (0, common_1.Post)('/cash-by-admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cash_by_admin_dto_1.CashByAdminDto]),
    __metadata("design:returntype", void 0)
], CashsController.prototype, "cashByAdmin", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cash_dto_1.CreateCashDto]),
    __metadata("design:returntype", void 0)
], CashsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CashsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/approve/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashsController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)('/reject/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reject_cash_dto_1.RejectCashDto]),
    __metadata("design:returntype", void 0)
], CashsController.prototype, "reject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashsController.prototype, "remove", null);
CashsController = __decorate([
    (0, common_1.Controller)('cashs'),
    __metadata("design:paramtypes", [cashs_service_1.CashsService])
], CashsController);
exports.CashsController = CashsController;
//# sourceMappingURL=cashs.controller.js.map