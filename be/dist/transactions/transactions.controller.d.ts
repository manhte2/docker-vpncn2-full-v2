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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { HistoryExtendPlanTransactionDto } from './dto/history-extend-plan-transaction.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto): string;
    historyExtendPlan(historyExtendPlanTransactionDto: HistoryExtendPlanTransactionDto): Promise<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/transactions.schema").Transaction> & import("../schemas/transactions.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[]>;
    historyUpgradePlan(historyExtendPlanTransactionDto: HistoryExtendPlanTransactionDto): Promise<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/transactions.schema").Transaction> & import("../schemas/transactions.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[]>;
    test(req: any): Promise<any>;
    findAll(req: any): Promise<Omit<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/transactions.schema").Transaction> & import("../schemas/transactions.schema").Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>, never>[]>;
    findOne(id: string): string;
    update(id: string, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: string): string;
}
