"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadsModule = void 0;
const common_1 = require("@nestjs/common");
const downloads_service_1 = require("./downloads.service");
const downloads_controller_1 = require("./downloads.controller");
const mongoose_1 = require("@nestjs/mongoose");
const downloads_schema_1 = require("../schemas/downloads.schema");
let DownloadsModule = class DownloadsModule {
};
DownloadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: downloads_schema_1.Download.name, schema: downloads_schema_1.DownloadSchema },
            ]),
        ],
        controllers: [downloads_controller_1.DownloadsController],
        providers: [downloads_service_1.DownloadsService],
    })
], DownloadsModule);
exports.DownloadsModule = DownloadsModule;
//# sourceMappingURL=downloads.module.js.map