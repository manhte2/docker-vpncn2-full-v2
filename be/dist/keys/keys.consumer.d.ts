import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { KeysService } from './keys.service';
export declare class ExpriedKeyConsumer extends WorkerHost {
    private readonly keysService;
    constructor(keysService: KeysService);
    process(job: Job<any, any, string>): Promise<any>;
}
export declare class ExpriedDataExpandKey extends WorkerHost {
    private readonly keysService;
    constructor(keysService: KeysService);
    process(job: Job<any, any, string>): Promise<any>;
}
