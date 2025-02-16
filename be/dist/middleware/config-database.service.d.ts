import { Model } from 'mongoose';
import { Test } from 'src/schemas/tests.schema';
export interface Active {
    active: number;
}
export declare class ConfigDatabaseService {
    private activeModel;
    constructor(activeModel: Model<Test>);
    isActive(): Promise<any>;
}
