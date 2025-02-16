"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const contacts_schema_1 = require("../schemas/contacts.schema");
let ContactsService = class ContactsService {
    constructor(contactModal) {
        this.contactModal = contactModal;
    }
    async sync(syncContactDto) {
        try {
            const contact = await this.contactModal.findOne({});
            if (contact) {
                await this.contactModal.findByIdAndUpdate(contact._id, syncContactDto);
            }
            else {
                await this.contactModal.create(syncContactDto);
            }
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Đồng bộ thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    async find() {
        try {
            return await this.contactModal.findOne();
        }
        catch (error) {
            throw error;
        }
    }
};
ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(contacts_schema_1.Contact.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ContactsService);
exports.ContactsService = ContactsService;
//# sourceMappingURL=contacts.service.js.map