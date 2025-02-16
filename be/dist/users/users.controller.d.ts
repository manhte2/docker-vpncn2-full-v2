/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    login(loginDto: LoginDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/users.schema").User> & import("../schemas/users.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
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
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(req: any): Promise<{
        currentPage: number;
        totalPage: number;
        itemsPerPage: number;
        totalItems: number;
        resultList: any[];
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/users.schema").User> & import("../schemas/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/users.schema").User> & import("../schemas/users.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../schemas/users.schema").User> & import("../schemas/users.schema").User & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
