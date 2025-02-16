import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { KumaService } from './kuma.service';
export declare class KumaMonitorConsumer extends WorkerHost {
    private readonly kumaService;
    constructor(kumaService: KumaService);
    process(job: Job<any, any, string>): Promise<any>;
}
