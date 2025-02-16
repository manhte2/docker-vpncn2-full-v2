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
/// <reference types="mongoose/types/inferschematype" />
import { HttpStatus } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { Key } from 'src/schemas/keys.schema';
import { Model } from 'mongoose';
import { Plan } from 'src/schemas/plans.schema';
import { User } from 'src/schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { Transaction } from 'src/schemas/transactions.schema';
import { Collab } from 'src/schemas/collabs.schema';
import { OutlineVPN } from 'outlinevpn-api';
import { Aws } from 'src/schemas/awses.schema';
import { MigrateKeyDto } from './dto/migrate-key.dto';
import { Server } from 'src/schemas/servers.schema';
import { Test } from 'src/schemas/tests.schema';
import { AddDataLimitKey } from './dto/add-data-limit-key.dto';
import { RenameKeyDto } from './dto/rename-key.dto';
import { MultiMigrateKeyDto } from './dto/multi-migrate-key.dto';
import { EndDateKeyDto } from './dto/end-date-key.dto';
import { Queue } from 'bullmq';
export declare class KeysService {
    private testModal;
    private keyModal;
    private serverModal;
    private gistModal;
    private planModal;
    private userModal;
    private transactionModal;
    private collabModal;
    private awsModal;
    private expriedKeyQueue;
    private expriedDataExpandQueue;
    private configService;
    private readonly S3;
    constructor(testModal: Model<Test>, keyModal: Model<Key>, serverModal: Model<Server>, gistModal: Model<Key>, planModal: Model<Plan>, userModal: Model<User>, transactionModal: Model<Transaction>, collabModal: Model<Collab>, awsModal: Model<Aws>, expriedKeyQueue: Queue, expriedDataExpandQueue: Queue, configService: ConfigService);
    test(): Promise<any>;
    create(createKeyDto: CreateKeyDto): string;
    multiMigrate(multiMigrateKeyDto: MultiMigrateKeyDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    migrate(migrateKeyDto: MigrateKeyDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    private escapeRegex;
    findAll(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        data: any;
    }>;
    findAllWithOutlineDataUsage(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        data: any[];
    }>;
    _getDataUsage(outlineVpn: OutlineVPN, keyId: string): Promise<number>;
    todayInfo(): Promise<{
        expireToday: number;
        buyToday: number;
        overbandWidthToday: number;
    }>;
    disableByAdmin(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    enableByAdmin(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    disable(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    enable(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    addDataLimit(id: string, addDataLimitKey: AddDataLimitKey): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    updateEndDate(id: string, endDateKeyDto: EndDateKeyDto): Promise<{
        status: HttpStatus;
        data: import("mongoose").Document<unknown, {}, Key> & Key & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
    }>;
    findOne(id: string): Promise<{
        gist: import("mongoose").Document<unknown, {}, Key> & Key & {
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
        status: HttpStatus;
        message: string;
    }>;
    rename(id: string, renameKeyDto: RenameKeyDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, Key> & Key & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    checkExpiredKey(): Promise<void>;
    _handleExpriedKeyCore(listKey: any): Promise<void>;
    checkExpireDataExpandKey(): Promise<void>;
    private rollBackDataExpand;
    _handleExpriedDataExpandKey(listKey: any): Promise<void>;
}
