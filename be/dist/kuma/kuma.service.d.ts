import { UpdateKumaDto } from './dto/update-kuma.dto';
import { CreateKumaDto } from './dto/create-kuma.dto';
import { ConfigService } from '@nestjs/config';
import { RemoveKumaDto } from './dto/remove-kuma.dto';
import { Server } from 'src/schemas/servers.schema';
import { Key } from 'src/schemas/keys.schema';
import { Model } from 'mongoose';
import { KeysService } from 'src/keys/keys.service';
import { Queue } from 'bullmq';
import { HttpService } from '@nestjs/axios';
export declare class KumaService {
    private configService;
    private readonly keyService;
    private keyModal;
    private serverModal;
    private kumaMonitorQueue;
    private readonly httpService;
    constructor(configService: ConfigService, keyService: KeysService, keyModal: Model<Key>, serverModal: Model<Server>, kumaMonitorQueue: Queue, httpService: HttpService);
    private extractInfo;
    monitor(monitorKumaDto: any): Promise<string>;
    test(): Promise<void>;
    _handleMonitorCore(result: any): Promise<void>;
    create(createKumaDto: CreateKumaDto): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateKumaDto: UpdateKumaDto): string;
    remove(removeKumaDto: RemoveKumaDto): Promise<string>;
}
