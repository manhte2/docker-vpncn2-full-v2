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
import { CashsService } from './cashs.service';
import { CreateCashDto } from './dto/create-cash.dto';
import { RejectCashDto } from './dto/reject-cash.dto';
import { CashByAdminDto } from './dto/cash-by-admin.dto';
export declare class CashsController {
    private readonly cashsService;
    constructor(cashsService: CashsService);
    autoBank(createCashDto: CreateCashDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    cashByAdmin(cashByAdminDto: CashByAdminDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/cashs.schema").Cash> & import("../schemas/cashs.schema").Cash & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    create(createCashDto: CreateCashDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/cashs.schema").Cash> & import("../schemas/cashs.schema").Cash & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<Omit<import("mongoose").Document<unknown, {}, import("../schemas/cashs.schema").Cash> & import("../schemas/cashs.schema").Cash & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    approve(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    reject(id: string, rejectCashDto: RejectCashDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    remove(id: string): string;
}
