import { CollabService } from './collab.service';
export declare class CollabModule {
    private readonly collabService;
    constructor(collabService: CollabService);
    onModuleInit(): Promise<void>;
}
