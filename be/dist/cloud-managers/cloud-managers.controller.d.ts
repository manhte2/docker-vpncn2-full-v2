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
import { CloudManagersService } from './cloud-managers.service';
import { CreateCloudManagerDto } from './dto/create-cloud-manager.dto';
import { UpdateCloudManagerDto } from './dto/update-cloud-manager.dto';
import { TotalCostDto } from './dto/total-cost.dto';
import { UpdateStatusCloudManagerDto } from './dto/update-status-cloud-manager.dto';
export declare class CloudManagersController {
    private readonly cloudManagersService;
    constructor(cloudManagersService: CloudManagersService);
    totalCost(totalCostDto: TotalCostDto): Promise<{
        cost: any;
    }>;
    create(createCloudManagerDto: CreateCloudManagerDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/cloudManagers.schema").CloudManager> & import("../schemas/cloudManagers.schema").CloudManager & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(req: any): Promise<{
        totalCost: any;
        listData: any[];
    }>;
    findOne(id: string): Promise<{
        server: number;
        remain: number;
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
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateStauts(id: string, updateStatusCloudManagerDto: UpdateStatusCloudManagerDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/cloudManagers.schema").CloudManager> & import("../schemas/cloudManagers.schema").CloudManager & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateCloudManagerDto: UpdateCloudManagerDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/cloudManagers.schema").CloudManager> & import("../schemas/cloudManagers.schema").CloudManager & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/cloudManagers.schema").CloudManager> & import("../schemas/cloudManagers.schema").CloudManager & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
