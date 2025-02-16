import mongoose, { HydratedDocument } from 'mongoose';
export type KeyDocument = HydratedDocument<Key>;
export declare class Key {
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
}
export declare const KeySchema: mongoose.Schema<Key, mongoose.Model<Key, any, any, any, mongoose.Document<unknown, any, Key> & Key & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Key, mongoose.Document<unknown, {}, mongoose.FlatRecord<Key>> & mongoose.FlatRecord<Key> & {
    _id: mongoose.Types.ObjectId;
}>;
