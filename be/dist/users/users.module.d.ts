import { UsersService } from './users.service';
export declare class UsersModule {
    private readonly usersService;
    constructor(usersService: UsersService);
    onModuleInit(): Promise<void>;
}
