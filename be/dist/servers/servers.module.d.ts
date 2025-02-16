import { ServersService } from './servers.service';
export declare class ServersModule {
    private readonly serversService;
    constructor(serversService: ServersService);
    onModuleInit(): Promise<void>;
}
