import { Model } from 'mongoose';
import { Cash } from 'src/schemas/cashs.schema';
import { Rose } from 'src/schemas/roses.schema';
import { Transaction } from 'src/schemas/transactions.schema';
import { User } from 'src/schemas/users.schema';
import { CashDto } from './dto/cash.dto';
import { TransactionPlanDto } from './dto/transaction-plan.dto';
import { TransactionExtendPlanDto } from './dto/transaction-extend-plan.dto';
import { GetByMonthDto } from './dto/getByMonth.dto';
import { GetByYearDto } from './dto/getByYear.dto';
import { Server } from 'src/schemas/servers.schema';
import { Key } from 'src/schemas/keys.schema';
import { GetTopUserByMonthDto } from './dto/GetTopUserByMonth.dto';
import { ExpiredKeyDto } from './dto/expiredKey.dto';
export declare class SatisfyService {
    private cashModal;
    private roseModal;
    private transactionModal;
    private userModal;
    private serverModal;
    private keyModal;
    constructor(cashModal: Model<Cash>, roseModal: Model<Rose>, transactionModal: Model<Transaction>, userModal: Model<User>, serverModal: Model<Server>, keyModal: Model<Key>);
    server(): Promise<{
        amountTotalServer: number;
        amountActiveServer: number;
        amountKeyActive: number;
        averageServerLive: number;
    }>;
    topPlan(): Promise<any[]>;
    expiredKey(expiredKeyDto: ExpiredKeyDto): Promise<any[]>;
    getTopUserByMonth(getTopUserByMonthDto: GetTopUserByMonthDto): Promise<any[]>;
    getTopUser(): Promise<any[]>;
    newUserToday(): Promise<any[]>;
    buyPlanToday(): Promise<any[]>;
    fullDataToday(): Promise<any[]>;
    newCashToday(): Promise<any[]>;
    getByLevel(): Promise<any[]>;
    findOne(id: string): Promise<{
        cash: any[];
        rose: any[];
        transaction: any[];
        discount: any[];
        currentMoney: number;
        numberIntoduce: number;
    }>;
    getByMonth(getByMonthDto: GetByMonthDto): Promise<{
        cash: any[];
        rose: any[];
        transaction: any[];
    }>;
    getByYear(getByYearDto: GetByYearDto): Promise<any[]>;
    cash(cashDto: CashDto): Promise<{
        cash: any[];
    }>;
    transactionPlan(transactionPlanDto: TransactionPlanDto): Promise<{
        transactionPlan: any[];
    }>;
    transactionExtendPlan(transactionExtendPlanDto: TransactionExtendPlanDto): Promise<{
        transactionExtendPlan: any[];
    }>;
}
