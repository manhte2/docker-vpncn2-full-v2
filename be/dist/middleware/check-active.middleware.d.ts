import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigDatabaseService } from './config-database.service';
export declare class CheckActiveMiddleware implements NestMiddleware {
    private readonly configDatabaseService;
    constructor(configDatabaseService: ConfigDatabaseService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
