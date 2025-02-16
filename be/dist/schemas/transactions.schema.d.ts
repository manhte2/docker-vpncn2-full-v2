import mongoose, { HydratedDocument } from 'mongoose';
export type TransactionDocument = HydratedDocument<Transaction>;
export declare class Transaction {
    code: string;
    userId: string;
    gistId: string;
    planId: string;
    extendPlanId: string;
    description: string;
    amount: number;
    discount: number;
    money: number;
}
export declare const TransactionSchema: mongoose.Schema<Transaction, mongoose.Model<Transaction, any, any, any, mongoose.Document<unknown, any, Transaction> & Transaction & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Transaction, mongoose.Document<unknown, {}, mongoose.FlatRecord<Transaction>> & mongoose.FlatRecord<Transaction> & {
    _id: mongoose.Types.ObjectId;
}>;
