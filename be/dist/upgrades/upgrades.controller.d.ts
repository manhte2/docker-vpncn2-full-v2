import { UpgradesService } from './upgrades.service';
import { UpdateUpgradeDto } from './dto/update-upgrade.dto';
import { BandWidthUpgradeDto } from './dto/band-width-upgrade.dto';
import { PlanUpgradeDto } from './dto/plan-upgrade.dto';
export declare class UpgradesController {
    private readonly upgradesService;
    constructor(upgradesService: UpgradesService);
    upgradeBandwidth(bandWidthUpgradeDto: BandWidthUpgradeDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    upgradePlan(planUpgradeDto: PlanUpgradeDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUpgradeDto: UpdateUpgradeDto): string;
    remove(id: string): string;
}
