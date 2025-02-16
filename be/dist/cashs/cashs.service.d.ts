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
import { RejectCashDto } from './dto/reject-cash.dto';
import { HttpStatus } from '@nestjs/common';
import { CreateCashDto } from './dto/create-cash.dto';
import { Cash } from 'src/schemas/cashs.schema';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { CashByAdminDto } from './dto/cash-by-admin.dto';
export declare class CashsService {
    private cashModal;
    private userModal;
    constructor(cashModal: Model<Cash>, userModal: Model<User>);
    autoBank(createCashDto: CreateCashDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    create(createCashDto: CreateCashDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cash> & Cash & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    cashByAdmin(cashByAdminDto: CashByAdminDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cash> & Cash & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<Omit<import("mongoose").Document<unknown, {}, Cash> & Cash & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    approve(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    reject(id: string, rejectCashDto: RejectCashDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    remove(id: number): string;
}
