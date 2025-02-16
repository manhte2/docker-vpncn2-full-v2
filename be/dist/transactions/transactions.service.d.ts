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
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from 'src/schemas/transactions.schema';
import { Model } from 'mongoose';
import { HistoryExtendPlanTransactionDto } from './dto/history-extend-plan-transaction.dto';
import { Gist } from 'src/schemas/gists.schema';
export declare class TransactionsService {
    private transactionModal;
    private gistModal;
    constructor(transactionModal: Model<Transaction>, gistModal: Model<Gist>);
    create(createTransactionDto: CreateTransactionDto): string;
    historyExtendPlan(historyExtendPlanTransactionDto: HistoryExtendPlanTransactionDto): Promise<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[]>;
    historyUpgradePlan(historyExtendPlanTransactionDto: HistoryExtendPlanTransactionDto): Promise<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[]>;
    test(): Promise<any>;
    findAll(req: any): Promise<Omit<Omit<Omit<Omit<import("mongoose").Document<unknown, {}, Transaction> & Transaction & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>, never>[]>;
    findOne(id: number): string;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: number): string;
}
