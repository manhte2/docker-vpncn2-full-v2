import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ServersService } from './servers.service';
export declare class DataUsageConsumer extends WorkerHost {
    private readonly serversService;
    constructor(serversService: ServersService);
    process(job: Job<any, any, string>): Promise<any>;
}
