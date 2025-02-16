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
exports.DataUsageConsumer = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const servers_service_1 = require("./servers.service");
let DataUsageConsumer = class DataUsageConsumer extends bullmq_1.WorkerHost {
    constructor(serversService) {
        super();
        this.serversService = serversService;
    }
    async process(job) {
        await this.serversService._handleCoreGetDataUsage(job.data.data);
    }
};
DataUsageConsumer = __decorate([
    (0, bullmq_1.Processor)('data-usage'),
    __metadata("design:paramtypes", [servers_service_1.ServersService])
], DataUsageConsumer);
exports.DataUsageConsumer = DataUsageConsumer;
//# sourceMappingURL=servers.consumer.js.map