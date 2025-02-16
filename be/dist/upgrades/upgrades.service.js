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
exports.UpgradesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const gists_schema_1 = require("../schemas/gists.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const extendPlans_schema_1 = require("../schemas/extendPlans.schema");
const outlinevpn_api_1 = require("outlinevpn-api");
const keys_schema_1 = require("../schemas/keys.schema");
const users_schema_1 = require("../schemas/users.schema");
const transactions_schema_1 = require("../schemas/transactions.schema");
const plans_schema_1 = require("../schemas/plans.schema");
const moment = require("moment");
const collabs_schema_1 = require("../schemas/collabs.schema");
const utils_1 = require("../utils");
const roseExtends_schema_1 = require("../schemas/roseExtends.schema");
let UpgradesService = class UpgradesService {
    constructor(gistModal, userModal, extendModal, planModal, keyModal, transactionModal, collabModal, roseExtend, configService) {
        this.gistModal = gistModal;
        this.userModal = userModal;
        this.extendModal = extendModal;
        this.planModal = planModal;
        this.keyModal = keyModal;
        this.transactionModal = transactionModal;
        this.collabModal = collabModal;
        this.roseExtend = roseExtend;
        this.configService = configService;
    }
    async upgradeBandwidth(bandWidthUpgradeDto) {
        var _a;
        try {
            const extendPlan = await this.extendModal.findById(bandWidthUpgradeDto.extendPlanId);
            const roseExtend = await this.roseExtend.findOne({});
            const gist = await this.gistModal
                .findById(bandWidthUpgradeDto.gistId)
                .populate({
                path: 'keyId',
                populate: {
                    path: 'serverId',
                },
            })
                .populate('planId');
            if (((_a = gist === null || gist === void 0 ? void 0 : gist.planId) === null || _a === void 0 ? void 0 : _a.price) === 0) {
                throw new common_1.BadRequestException({
                    message: 'Gói dùng thử không thể nâng cấp',
                });
            }
            const user = await this.userModal.findById(gist.userId._id);
            if (Number(extendPlan.price) > Number(user.money))
                throw new common_1.BadRequestException({
                    message: 'Bạn không đủ tiền để đăng kí dịch vụ này',
                });
            const today = moment();
            if (gist.keyId.endExpandDate &&
                today.isBefore(moment(gist.keyId.endExpandDate))) {
                throw new common_1.BadRequestException({
                    message: 'Bạn phải chờ hết thời gian mở rộng băng thông cũ, mới có thể mua thêm băng thông',
                });
            }
            const outlineVpn = new outlinevpn_api_1.OutlineVPN({
                apiUrl: gist.keyId.serverId.apiUrl,
                fingerprint: gist.keyId.serverId.fingerPrint,
            });
            const data = gist.keyId.dataLimit + extendPlan.bandWidth * 1000000000;
            await outlineVpn.enableUser(gist.keyId.keyId);
            await outlineVpn.addDataLimit(gist.keyId.keyId, data);
            let endExpandDate;
            endExpandDate = today.add(bandWidthUpgradeDto.month, 'M');
            endExpandDate = moment(endExpandDate).isAfter(moment(gist.keyId.endDate))
                ? gist.keyId.endDate
                : endExpandDate;
            await this.keyModal.findByIdAndUpdate(gist.keyId, {
                dataExpand: data,
                endExpandDate,
                enable: true,
            });
            const collab = await this.collabModal.findOne({});
            const disccount = user.level === 1
                ? collab['level1']
                : user.level === 2
                    ? collab['level2']
                    : user.level === 3
                        ? collab['level3']
                        : 0;
            const discount1 = bandWidthUpgradeDto.month >= 9
                ? roseExtend['level3']
                : bandWidthUpgradeDto.month >= 5
                    ? roseExtend['level2']
                    : roseExtend['level1'];
            const money = ((extendPlan.price *
                Number(bandWidthUpgradeDto.month) *
                (100 - disccount) *
                (100 - discount1)) /
                (100 * 100)).toFixed(0);
            const code = `${moment().format('YYYYMMDD')}-${(0, utils_1.generateRandomString)(4).toLowerCase()}`;
            await this.transactionModal.create({
                code,
                userId: user._id,
                gistId: bandWidthUpgradeDto.gistId,
                extendPlanId: bandWidthUpgradeDto.extendPlanId,
                money: money,
                discount: disccount,
                description: `Đăng kí gói ${extendPlan.name}`,
            });
            await this.userModal.findByIdAndUpdate(user._id, {
                $inc: { money: -money },
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Thêm mới thành công',
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async upgradePlan(planUpgradeDto) {
        var _a;
        try {
            const gist = await this.gistModal
                .findById(planUpgradeDto.gistId)
                .populate('keyId')
                .populate('planId');
            const plan = await this.planModal.findById(gist.planId);
            const user = await this.userModal.findById(gist.userId._id);
            if (((_a = gist === null || gist === void 0 ? void 0 : gist.planId) === null || _a === void 0 ? void 0 : _a.price) === 0) {
                throw new common_1.BadRequestException({
                    message: 'Gói dùng thử không thể nâng cấp',
                });
            }
            if (Number(plan.price) > Number(user.money))
                throw new common_1.BadRequestException({
                    message: 'Bạn không đủ tiền để đăng kí dịch vụ này',
                });
            const lastEndDate = moment(gist.keyId.endDate);
            const day = gist.planId.day;
            const endDate = lastEndDate.add(day, 'd');
            await this.keyModal.findByIdAndUpdate(gist.keyId._id, {
                endDate,
            });
            const collab = await this.collabModal.findOne({});
            const disccount = user.level === 1
                ? collab['level1']
                : user.level === 2
                    ? collab['level2']
                    : user.level === 3
                        ? collab['level3']
                        : 0;
            const money = ((plan.price * (100 - disccount)) / 100).toFixed(0);
            const code = `${moment().format('YYYYMMDD')}-${(0, utils_1.generateRandomString)(4).toLowerCase()}`;
            await this.transactionModal.create({
                code,
                userId: user._id,
                gistId: planUpgradeDto.gistId,
                planId: plan._id,
                money: money,
                discount: disccount,
                description: `Gia hạn gói ${plan.name}`,
            });
            await this.userModal.findByIdAndUpdate(user._id, {
                $inc: { money: -money },
            });
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Gia hạn thành công',
            };
        }
        catch (error) {
            throw error;
        }
    }
    findAll() {
        return `This action returns all upgrades`;
    }
    findOne(id) {
        return `This action returns a #${id} upgrade`;
    }
    update(id, updateUpgradeDto) {
        return `This action updates a #${id} upgrade`;
    }
    remove(id) {
        return `This action removes a #${id} upgrade`;
    }
};
UpgradesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(gists_schema_1.Gist.name)),
    __param(1, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __param(2, (0, mongoose_2.InjectModel)(extendPlans_schema_1.ExtendPlan.name)),
    __param(3, (0, mongoose_2.InjectModel)(plans_schema_1.Plan.name)),
    __param(4, (0, mongoose_2.InjectModel)(keys_schema_1.Key.name)),
    __param(5, (0, mongoose_2.InjectModel)(transactions_schema_1.Transaction.name)),
    __param(6, (0, mongoose_2.InjectModel)(collabs_schema_1.Collab.name)),
    __param(7, (0, mongoose_2.InjectModel)(roseExtends_schema_1.RoseExtend.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model,
        config_1.ConfigService])
], UpgradesService);
exports.UpgradesService = UpgradesService;
//# sourceMappingURL=upgrades.service.js.map