import mongoose, { HydratedDocument } from 'mongoose';
export type ServerDocument = HydratedDocument<Server>;
export declare class Server {
    serverId: string;
    location: string;
    apiUrl: string;
    fingerPrint: string;
    name: string;
    metricsEnabled: boolean;
    createdTimestampMs: number;
    version: string;
    portForNewAccessKeys: number;
    hostnameForAccessKeys: string;
    totalBandWidth: number;
    deleteAt: Date;
    status: number;
    remark: string;
    maxUsage: number;
    dataTransfer: number;
    isConnectKuma: number;
    cloudManagerId: string;
    monitorId: string[];
}
export declare const ServerSchema: mongoose.Schema<Server, mongoose.Model<Server, any, any, any, mongoose.Document<unknown, any, Server> & Server & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Server, mongoose.Document<unknown, {}, mongoose.FlatRecord<Server>> & mongoose.FlatRecord<Server> & {
    _id: mongoose.Types.ObjectId;
}>;
