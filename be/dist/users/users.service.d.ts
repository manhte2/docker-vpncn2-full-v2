import { ForgotPasswordDto } from './dto/forgot-password';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { LoginDto } from './dto/login.dto';
import { Transaction } from 'src/schemas/transactions.schema';
import { Cash } from 'src/schemas/cashs.schema';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nest-modules/mailer';
export declare class UsersService {
    private userModal;
    private transactionModal;
    private cashModal;
    private configService;
    private jwtService;
    private mailerService;
    constructor(userModal: Model<User>, transactionModal: Model<Transaction>, cashModal: Model<Cash>, configService: ConfigService, jwtService: JwtService, mailerService: MailerService);
    createDefaultAdmin(): Promise<void>;
    login(loginDto: LoginDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        status: HttpStatus;
        message: string;
        data: {
            email: string;
            username: string;
            role: number;
            phone: string;
            address: string;
            country: string;
            job: string;
            purpose: number;
            introduceCode: string;
            introduceUserId: string;
            level: number;
            money: number;
            isFree: number;
            canMigrate: boolean;
            _id: mongoose.Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        resultList: any[];
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        status: HttpStatus;
        message: string;
        data: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    remove(id: string): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
