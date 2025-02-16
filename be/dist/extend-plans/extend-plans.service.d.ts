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
import { CreateExtendPlanDto } from './dto/create-extend-plan.dto';
import { UpdateExtendPlanDto } from './dto/update-extend-plan.dto';
import { ExtendPlan } from 'src/schemas/extendPlans.schema';
import { Model } from 'mongoose';
import { Transaction } from 'src/schemas/transactions.schema';
export declare class ExtendPlansService {
    private extendPlanModal;
    private transactionModal;
    constructor(extendPlanModal: Model<ExtendPlan>, transactionModal: Model<Transaction>);
    create(createExtendPlanDto: CreateExtendPlanDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, ExtendPlan> & ExtendPlan & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<any[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, ExtendPlan> & ExtendPlan & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateExtendPlanDto: UpdateExtendPlanDto): Promise<{
        status: HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, ExtendPlan> & ExtendPlan & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
