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
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { MigrateKeyDto } from './dto/migrate-key.dto';
import { AddDataLimitKey } from './dto/add-data-limit-key.dto';
import { RenameKeyDto } from './dto/rename-key.dto';
import { MultiMigrateKeyDto } from './dto/multi-migrate-key.dto';
import { EndDateKeyDto } from './dto/end-date-key.dto';
export declare class KeysController {
    private readonly keysService;
    constructor(keysService: KeysService);
    test(): Promise<any>;
    multiMigrate(multiMigrateKeyDto: MultiMigrateKeyDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    migrate(migrateKeyDto: MigrateKeyDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    create(createKeyDto: CreateKeyDto): string;
    todayInfo(): Promise<{
        expireToday: number;
        buyToday: number;
        overbandWidthToday: number;
    }>;
    findAllWithOutlineDataUsage(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        data: any[];
    }>;
    findAll(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        data: any;
    }>;
    disable(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    enable(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    addDataLimit(id: string, addDataLimitKey: AddDataLimitKey): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    updateEndDate(id: string, endDateKeyDto: EndDateKeyDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        data: import("mongoose").Document<unknown, {}, import("../schemas/keys.schema").Key> & import("../schemas/keys.schema").Key & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    cron(): Promise<void>;
    findOne(id: string): Promise<{
        gist: import("mongoose").Document<unknown, {}, import("../schemas/keys.schema").Key> & import("../schemas/keys.schema").Key & {
            _id: import("mongoose").Types.ObjectId;
        };
        historyKey: any[];
        keyId: string;
        name: string;
        password: string;
        port: number;
        method: string;
        accessUrl: string;
        enable: boolean;
        enableByAdmin: boolean;
        dataLimit: number;
        dataUsageYesterday: number;
        dataUsage: number;
        arrayDataUsage: number[];
        dataExpand: number;
        serverId: string;
        userId: string;
        awsId: string;
        account: string;
        startDate: Date;
        endDate: Date;
        endExpandDate: Date;
        status: number;
        createDate: Date;
        migrateDate: Date;
        counterMigrate: number;
        _id: import("mongoose").Types.ObjectId;
    }>;
    upgrade(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    rename(id: string, renameKeyDto: RenameKeyDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/keys.schema").Key> & import("../schemas/keys.schema").Key & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
