import mongoose, { HydratedDocument } from 'mongoose';
export type CloudManagerDocument = HydratedDocument<CloudManager>;
export declare class CloudManager {
    name: string;
    startDate: Date;
    endDate: Date;
    dieDate: Date;
    status: number;
    cloudId: string;
    providerId: string;
    key: string;
    price: number;
    remark: string;
    isDelete: number;
}
export declare const CloudManagerSchema: mongoose.Schema<CloudManager, mongoose.Model<CloudManager, any, any, any, mongoose.Document<unknown, any, CloudManager> & CloudManager & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CloudManager, mongoose.Document<unknown, {}, mongoose.FlatRecord<CloudManager>> & mongoose.FlatRecord<CloudManager> & {
    _id: mongoose.Types.ObjectId;
}>;
