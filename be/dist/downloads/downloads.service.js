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
exports.DownloadsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const downloads_schema_1 = require("../schemas/downloads.schema");
const mongoose_2 = require("mongoose");
let DownloadsService = class DownloadsService {
    constructor(downloadModal) {
        this.downloadModal = downloadModal;
    }
    async sync(syncDownloadDto) {
        try {
            const download = await this.downloadModal.findOne({});
            if (download) {
                await this.downloadModal.findByIdAndUpdate(download._id, syncDownloadDto);
            }
            else {
                await this.downloadModal.create(syncDownloadDto);
            }
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Đồng bộ thành công thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async find() {
        try {
            return await this.downloadModal.findOne();
        }
        catch (error) {
            throw error;
        }
    }
};
DownloadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(downloads_schema_1.Download.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DownloadsService);
exports.DownloadsService = DownloadsService;
//# sourceMappingURL=downloads.service.js.map