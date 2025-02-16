import mongoose, { HydratedDocument } from 'mongoose';
export type CashDocument = HydratedDocument<Cash>;
export declare class Cash {
    code: string;
    userId: string;
    money: number;
    content: string;
    status: number;
    type: number;
    description: string;
    createByAdmin: number;
}
export declare const CashSchema: mongoose.Schema<Cash, mongoose.Model<Cash, any, any, any, mongoose.Document<unknown, any, Cash> & Cash & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cash, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cash>> & mongoose.FlatRecord<Cash> & {
    _id: mongoose.Types.ObjectId;
}>;
