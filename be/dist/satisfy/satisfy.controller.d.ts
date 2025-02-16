import { SatisfyService } from './satisfy.service';
import { CashDto } from './dto/cash.dto';
import { TransactionPlanDto } from './dto/transaction-plan.dto';
import { TransactionExtendPlanDto } from './dto/transaction-extend-plan.dto';
import { GetByMonthDto } from './dto/getByMonth.dto';
import { GetByYearDto } from './dto/getByYear.dto';
import { GetTopUserByMonthDto } from './dto/GetTopUserByMonth.dto';
import { ExpiredKeyDto } from './dto/expiredKey.dto';
export declare class SatisfyController {
    private readonly satisfyService;
    constructor(satisfyService: SatisfyService);
    server(): Promise<{
        amountTotalServer: number;
        amountActiveServer: number;
        amountKeyActive: number;
        averageServerLive: number;
    }>;
    topPlan(): Promise<any[]>;
    getByLevel(): Promise<any[]>;
    getTopUser(): Promise<any[]>;
    newUserToday(): Promise<any[]>;
    fullDataToday(): Promise<any[]>;
    buyPlanToday(): Promise<any[]>;
    newCashToday(): Promise<any[]>;
    expiredKey(expiredKeyDto: ExpiredKeyDto): Promise<any[]>;
    getTopUserByMonth(getTopUserByMonthDto: GetTopUserByMonthDto): Promise<any[]>;
    findOne(id: string): Promise<{
        cash: any[];
        rose: any[];
        transaction: any[];
        discount: any[];
        currentMoney: number;
        numberIntoduce: number;
    }>;
    cash(cashDto: CashDto): Promise<{
        cash: any[];
    }>;
    getByMonth(getByMonthDto: GetByMonthDto): Promise<{
        cash: any[];
        rose: any[];
        transaction: any[];
    }>;
    getByYear(getByYearDto: GetByYearDto): Promise<any[]>;
    transactionPlan(transactionPlanDto: TransactionPlanDto): Promise<{
        transactionPlan: any[];
    }>;
    transactionExtendPlan(transactionExtendPlanDto: TransactionExtendPlanDto): Promise<{
        transactionExtendPlan: any[];
    }>;
}
