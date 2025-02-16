/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ServersService } from './servers.service';
import { SyncServerDto } from './dto/sync-server.dto';
import { UpdateLocationServerDto } from './dto/update-location-server.dto';
import { UpdateNameServerDto } from './dto/update-name-server.dto';
import { MigrateServerDto } from './dto/migrate-server.dto';
import { SettingBandWidthDefaultDto } from './dto/setting-bandwidth-default.dto';
import { UpdateRemarkServerDto } from './dto/update-remark-server.dto';
import { UpdateTotalBandwidthServerDto } from './dto/update-total-bandwidth-server.dto';
import { UpdateStatusServerDto } from './dto/update-status-server.dto';
import { UpdateCloudManagerDto } from './dto/update-cloud-manager.dto';
export declare class ServersController {
    private readonly serversService;
    constructor(serversService: ServersService);
    settingBandWidthDefault(settingBandWidthDefaultDto: SettingBandWidthDefaultDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    migrate(migrateServerDto: MigrateServerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    create(syncServerDto: SyncServerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        isCheckUnique: number;
        message: string;
    } | {
        status: import("@nestjs/common").HttpStatus;
        message: string;
        isCheckUnique?: undefined;
    }>;
    findSettingBandwidthDefault(): Promise<import("mongoose").Document<unknown, {}, import("../schemas/settingBandwidths.schema").SettingBandwidth> & import("../schemas/settingBandwidths.schema").SettingBandwidth & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getServerToMigrate(req: any): Promise<any[]>;
    getNormalServer(req: any): Promise<any[]>;
    findAll(req: any): Promise<any[]>;
    updateLocation(id: string, updateLocationServerDto: UpdateLocationServerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/servers.schema").Server> & import("../schemas/servers.schema").Server & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateRemark(id: string, updateRemarkServerDto: UpdateRemarkServerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/servers.schema").Server> & import("../schemas/servers.schema").Server & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateTotalBanwidth(id: string, updateTotalBandwidthServerDto: UpdateTotalBandwidthServerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/servers.schema").Server> & import("../schemas/servers.schema").Server & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateNameServer(id: string, updateNameServerDto: UpdateNameServerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/servers.schema").Server> & import("../schemas/servers.schema").Server & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateStautsServer(id: string, updateStatusServerDto: UpdateStatusServerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/servers.schema").Server> & import("../schemas/servers.schema").Server & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateCloudManager(id: string, updateCloudManagerDto: UpdateCloudManagerDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/servers.schema").Server> & import("../schemas/servers.schema").Server & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string, req: any): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    cron(): Promise<void>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/servers.schema").Server> & import("../schemas/servers.schema").Server & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
