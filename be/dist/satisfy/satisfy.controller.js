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
exports.SatisfyController = void 0;
const common_1 = require("@nestjs/common");
const satisfy_service_1 = require("./satisfy.service");
const cash_dto_1 = require("./dto/cash.dto");
const transaction_plan_dto_1 = require("./dto/transaction-plan.dto");
const transaction_extend_plan_dto_1 = require("./dto/transaction-extend-plan.dto");
const getByMonth_dto_1 = require("./dto/getByMonth.dto");
const getByYear_dto_1 = require("./dto/getByYear.dto");
const GetTopUserByMonth_dto_1 = require("./dto/GetTopUserByMonth.dto");
const expiredKey_dto_1 = require("./dto/expiredKey.dto");
let SatisfyController = class SatisfyController {
    constructor(satisfyService) {
        this.satisfyService = satisfyService;
    }
    server() {
        return this.satisfyService.server();
    }
    topPlan() {
        return this.satisfyService.topPlan();
    }
    getByLevel() {
        return this.satisfyService.getByLevel();
    }
    getTopUser() {
        return this.satisfyService.getTopUser();
    }
    newUserToday() {
        return this.satisfyService.newUserToday();
    }
    fullDataToday() {
        return this.satisfyService.fullDataToday();
    }
    buyPlanToday() {
        return this.satisfyService.buyPlanToday();
    }
    newCashToday() {
        return this.satisfyService.newCashToday();
    }
    expiredKey(expiredKeyDto) {
        return this.satisfyService.expiredKey(expiredKeyDto);
    }
    getTopUserByMonth(getTopUserByMonthDto) {
        return this.satisfyService.getTopUserByMonth(getTopUserByMonthDto);
    }
    findOne(id) {
        return this.satisfyService.findOne(id);
    }
    cash(cashDto) {
        return this.satisfyService.cash(cashDto);
    }
    getByMonth(getByMonthDto) {
        return this.satisfyService.getByMonth(getByMonthDto);
    }
    getByYear(getByYearDto) {
        return this.satisfyService.getByYear(getByYearDto);
    }
    transactionPlan(transactionPlanDto) {
        return this.satisfyService.transactionPlan(transactionPlanDto);
    }
    transactionExtendPlan(transactionExtendPlanDto) {
        return this.satisfyService.transactionExtendPlan(transactionExtendPlanDto);
    }
};
__decorate([
    (0, common_1.Get)('/server'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "server", null);
__decorate([
    (0, common_1.Get)('/top-plan'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "topPlan", null);
__decorate([
    (0, common_1.Get)('/get-by-level'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "getByLevel", null);
__decorate([
    (0, common_1.Get)('/get-top-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "getTopUser", null);
__decorate([
    (0, common_1.Get)('/new-user-today'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "newUserToday", null);
__decorate([
    (0, common_1.Get)('/full-data-today'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "fullDataToday", null);
__decorate([
    (0, common_1.Get)('/buy-plan-today'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "buyPlanToday", null);
__decorate([
    (0, common_1.Get)('/new-cash-today'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "newCashToday", null);
__decorate([
    (0, common_1.Post)('/expried-key'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [expiredKey_dto_1.ExpiredKeyDto]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "expiredKey", null);
__decorate([
    (0, common_1.Post)('/get-top-user-by-month'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetTopUserByMonth_dto_1.GetTopUserByMonthDto]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "getTopUserByMonth", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/cash'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cash_dto_1.CashDto]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "cash", null);
__decorate([
    (0, common_1.Post)('/get-by-month'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getByMonth_dto_1.GetByMonthDto]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "getByMonth", null);
__decorate([
    (0, common_1.Post)('/get-by-year'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getByYear_dto_1.GetByYearDto]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "getByYear", null);
__decorate([
    (0, common_1.Post)('/transaction-plan'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_plan_dto_1.TransactionPlanDto]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "transactionPlan", null);
__decorate([
    (0, common_1.Post)('/transaction-extend-plan'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_extend_plan_dto_1.TransactionExtendPlanDto]),
    __metadata("design:returntype", void 0)
], SatisfyController.prototype, "transactionExtendPlan", null);
SatisfyController = __decorate([
    (0, common_1.Controller)('satisfy'),
    __metadata("design:paramtypes", [satisfy_service_1.SatisfyService])
], SatisfyController);
exports.SatisfyController = SatisfyController;
//# sourceMappingURL=satisfy.controller.js.map