import { HttpStatus } from '@nestjs/common';
import { UpdateUpgradeDto } from './dto/update-upgrade.dto';
import { BandWidthUpgradeDto } from './dto/band-width-upgrade.dto';
import { ConfigService } from '@nestjs/config';
import { Gist } from 'src/schemas/gists.schema';
import { Model } from 'mongoose';
import { ExtendPlan } from 'src/schemas/extendPlans.schema';
import { Key } from 'src/schemas/keys.schema';
import { User } from 'src/schemas/users.schema';
import { Transaction } from 'src/schemas/transactions.schema';
import { PlanUpgradeDto } from './dto/plan-upgrade.dto';
import { Plan } from 'src/schemas/plans.schema';
import { Collab } from 'src/schemas/collabs.schema';
import { RoseExtend } from 'src/schemas/roseExtends.schema';
export declare class UpgradesService {
    private gistModal;
    private userModal;
    private extendModal;
    private planModal;
    private keyModal;
    private transactionModal;
    private collabModal;
    private roseExtend;
    private configService;
    constructor(gistModal: Model<Gist>, userModal: Model<User>, extendModal: Model<ExtendPlan>, planModal: Model<Plan>, keyModal: Model<Key>, transactionModal: Model<Transaction>, collabModal: Model<Collab>, roseExtend: Model<RoseExtend>, configService: ConfigService);
    upgradeBandwidth(bandWidthUpgradeDto: BandWidthUpgradeDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    upgradePlan(planUpgradeDto: PlanUpgradeDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUpgradeDto: UpdateUpgradeDto): string;
    remove(id: number): string;
}
