import mongoose, { HydratedDocument } from 'mongoose';
export type RoseDocument = HydratedDocument<Rose>;
export declare class Rose {
    code: string;
    reciveRoseId: string;
    introducedId: string;
    plan: string;
    price: number;
    percent: number;
    recive: number;
}
export declare const RoseSchema: mongoose.Schema<Rose, mongoose.Model<Rose, any, any, any, mongoose.Document<unknown, any, Rose> & Rose & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Rose, mongoose.Document<unknown, {}, mongoose.FlatRecord<Rose>> & mongoose.FlatRecord<Rose> & {
    _id: mongoose.Types.ObjectId;
}>;
