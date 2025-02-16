import { CommisionsService } from './commisions.service';
export declare class CommisionsModule {
    private readonly commisionsService;
    constructor(commisionsService: CommisionsService);
    onModuleInit(): Promise<void>;
}
