import { HttpStatus } from '@nestjs/common';
import { CreateGistDto } from './dto/create-gist.dto';
import { Gist } from 'src/schemas/gists.schema';
import mongoose, { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Plan } from 'src/schemas/plans.schema';
import { Server } from 'src/schemas/servers.schema';
import { Key } from 'src/schemas/keys.schema';
import { User } from 'src/schemas/users.schema';
import { Transaction } from 'src/schemas/transactions.schema';
import { Commision } from 'src/schemas/commisions.schema';
import { Rose } from 'src/schemas/roses.schema';
import { UpdateExtensionGistDto } from './dto/update-extension-gist.dto';
import { Collab } from 'src/schemas/collabs.schema';
import { Aws } from 'src/schemas/awses.schema';
import { BackUpGistDto } from './dto/back-gist.dto';
export declare class GistsService {
    private gistModal;
    private planModal;
    private serverModal;
    private keyModal;
    private userModal;
    private transactionModal;
    private commisionModal;
    private roseModal;
    private collabModal;
    private awsModal;
    private configService;
    private readonly S3;
    constructor(gistModal: Model<Gist>, planModal: Model<Plan>, serverModal: Model<Server>, keyModal: Model<Key>, userModal: Model<User>, transactionModal: Model<Transaction>, commisionModal: Model<Commision>, roseModal: Model<Rose>, collabModal: Model<Collab>, awsModal: Model<Aws>, configService: ConfigService);
    create(createGistDto: CreateGistDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Gist> & Gist & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        data: Omit<Omit<Omit<mongoose.Document<unknown, {}, Gist> & Gist & {
            _id: mongoose.Types.ObjectId;
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
        _id: mongoose.Types.ObjectId;
    }>;
    updateExtension(id: string, updateExtensionGistDto: UpdateExtensionGistDto): Promise<{
        status: HttpStatus;
        message: string;
        updatedGist: mongoose.Document<unknown, {}, Gist> & Gist & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    remove(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    backUp(backUpGistDto: BackUpGistDto): Promise<string>;
}
