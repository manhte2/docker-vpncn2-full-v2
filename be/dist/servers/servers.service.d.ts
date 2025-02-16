import { HttpStatus } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { Server } from 'src/schemas/servers.schema';
import { Key } from 'src/schemas/keys.schema';
import { SyncServerDto } from './dto/sync-server.dto';
import { Gist } from 'src/schemas/gists.schema';
import { ConfigService } from '@nestjs/config';
import { UpdateLocationServerDto } from './dto/update-location-server.dto';
import { UpdateNameServerDto } from './dto/update-name-server.dto';
import { Aws } from 'src/schemas/awses.schema';
import { MigrateServerDto } from './dto/migrate-server.dto';
import { KeysService } from 'src/keys/keys.service';
import { SettingBandwidth } from 'src/schemas/settingBandwidths.schema';
import { SettingBandWidthDefaultDto } from './dto/setting-bandwidth-default.dto';
import { UpdateRemarkServerDto } from './dto/update-remark-server.dto';
import { UpdateTotalBandwidthServerDto } from './dto/update-total-bandwidth-server.dto';
import { KumaService } from 'src/kuma/kuma.service';
import { UpdateStatusServerDto } from './dto/update-status-server.dto';
import { UpdateCloudManagerDto } from './dto/update-cloud-manager.dto';
import { Queue } from 'bullmq';
export declare class ServersService {
    private serverModal;
    private keyModal;
    private gistModal;
    private awsModal;
    private settingBandwidthModal;
    private dataUsageQueue;
    private keyService;
    private configService;
    private kumaService;
    private readonly S3;
    constructor(serverModal: Model<Server>, keyModal: Model<Key>, gistModal: Model<Gist>, awsModal: Model<Aws>, settingBandwidthModal: Model<SettingBandwidth>, dataUsageQueue: Queue, keyService: KeysService, configService: ConfigService, kumaService: KumaService);
    settingBandWidthDefault(settingBandWidthDefaultDto: SettingBandWidthDefaultDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    findSettingBandWidthDefault(): Promise<mongoose.Document<unknown, {}, SettingBandwidth> & SettingBandwidth & {
        _id: mongoose.Types.ObjectId;
    }>;
    migrate(migrateServerDto: MigrateServerDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    sync(syncServerDto: SyncServerDto): Promise<{
        status: HttpStatus;
        isCheckUnique: number;
        message: string;
    } | {
        status: HttpStatus;
        message: string;
        isCheckUnique?: undefined;
    }>;
    getServerToMigrate(req: any): Promise<any[]>;
    getNormalServer(req: any): Promise<any[]>;
    findAll(req: any): Promise<any[]>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, Server> & Server & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateLocation(id: string, updateLocationServerDto: UpdateLocationServerDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Server> & Server & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    updateRemark(id: string, updateRemarkServerDto: UpdateRemarkServerDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Server> & Server & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    updateTotalBanwidth(id: string, updateTotalBandwidthServerDto: UpdateTotalBandwidthServerDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Server> & Server & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    updateNameServer(id: string, updateNameServerDto: UpdateNameServerDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Server> & Server & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    updateStautsServer(id: string, updateStatusServerDto: UpdateStatusServerDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Server> & Server & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    updateCloudManager(id: string, updateCloudManagerDto: UpdateCloudManagerDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, Server> & Server & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    remove(id: string, req: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    createDefaulBandWidth(): Promise<void>;
    getDataUsage(): Promise<void>;
    _handleCoreGetDataUsage(listKey: any): Promise<void>;
}
