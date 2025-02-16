import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigDatabaseService } from './middleware/config-database.service';
export declare class AppModule implements NestModule {
    private configDatabaseService;
    constructor(configDatabaseService: ConfigDatabaseService);
    configure(consumer: MiddlewareConsumer): Promise<void>;
}
