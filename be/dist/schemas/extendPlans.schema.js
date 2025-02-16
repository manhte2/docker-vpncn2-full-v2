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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendPlanSchema = exports.ExtendPlan = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ExtendPlan = class ExtendPlan {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ExtendPlan.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExtendPlan.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], ExtendPlan.prototype, "bandWidth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], ExtendPlan.prototype, "status", void 0);
ExtendPlan = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ExtendPlan);
exports.ExtendPlan = ExtendPlan;
exports.ExtendPlanSchema = mongoose_1.SchemaFactory.createForClass(ExtendPlan);
//# sourceMappingURL=extendPlans.schema.js.map