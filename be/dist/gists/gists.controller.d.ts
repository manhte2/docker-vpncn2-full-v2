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
import { UpdateExtensionGistDto } from './dto/update-extension-gist.dto';
import { GistsService } from './gists.service';
import { CreateGistDto } from './dto/create-gist.dto';
import { BackUpGistDto } from './dto/back-gist.dto';
export declare class GistsController {
    private readonly gistsService;
    constructor(gistsService: GistsService);
    backup(backUpGistDto: BackUpGistDto): Promise<string>;
    create(createGistDto: CreateGistDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/gists.schema").Gist> & import("../schemas/gists.schema").Gist & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        data: Omit<Omit<Omit<import("mongoose").Document<unknown, {}, import("../schemas/gists.schema").Gist> & import("../schemas/gists.schema").Gist & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>, never>[];
    }>;
    findOne(id: string): Promise<{
        code: string;
        userId: string;
        planId: string;
        keyId: string;
        extension: string;
        status: number;
        createDate: Date;
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateExtension(id: string, updateExtensionGistDto: UpdateExtensionGistDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        updatedGist: import("mongoose").Document<unknown, {}, import("../schemas/gists.schema").Gist> & import("../schemas/gists.schema").Gist & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
