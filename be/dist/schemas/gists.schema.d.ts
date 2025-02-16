import mongoose, { HydratedDocument } from 'mongoose';
export type GistDocument = HydratedDocument<Gist>;
export declare class Gist {
    code: string;
    userId: string;
    planId: string;
    keyId: string;
    extension: string;
    status: number;
    createDate: Date;
}
export declare const GistSchema: mongoose.Schema<Gist, mongoose.Model<Gist, any, any, any, mongoose.Document<unknown, any, Gist> & Gist & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Gist, mongoose.Document<unknown, {}, mongoose.FlatRecord<Gist>> & mongoose.FlatRecord<Gist> & {
    _id: mongoose.Types.ObjectId;
}>;
