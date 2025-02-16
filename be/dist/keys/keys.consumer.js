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
exports.ExpriedDataExpandKey = exports.ExpriedKeyConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const keys_service_1 = require("./keys.service");
let ExpriedKeyConsumer = class ExpriedKeyConsumer extends bullmq_1.WorkerHost {
    constructor(keysService) {
        super();
        this.keysService = keysService;
    }
    async process(job) {
        await this.keysService._handleExpriedKeyCore(job.data.data);
    }
};
ExpriedKeyConsumer = __decorate([
    (0, bullmq_1.Processor)('expried-key'),
    __metadata("design:paramtypes", [keys_service_1.KeysService])
], ExpriedKeyConsumer);
exports.ExpriedKeyConsumer = ExpriedKeyConsumer;
let ExpriedDataExpandKey = class ExpriedDataExpandKey extends bullmq_1.WorkerHost {
    constructor(keysService) {
        super();
        this.keysService = keysService;
    }
    async process(job) {
        await this.keysService._handleExpriedDataExpandKey(job.data.data);
    }
};
ExpriedDataExpandKey = __decorate([
    (0, bullmq_1.Processor)('expried-data-expand-key'),
    __metadata("design:paramtypes", [keys_service_1.KeysService])
], ExpriedDataExpandKey);
exports.ExpriedDataExpandKey = ExpriedDataExpandKey;
//# sourceMappingURL=keys.consumer.js.map