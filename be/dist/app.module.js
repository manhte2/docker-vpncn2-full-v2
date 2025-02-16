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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const users_module_1 = require("./users/users.module");
const plans_module_1 = require("./plans/plans.module");
const gists_module_1 = require("./gists/gists.module");
const servers_module_1 = require("./servers/servers.module");
const schedule_1 = require("@nestjs/schedule");
const contacts_module_1 = require("./contacts/contacts.module");
const downloads_module_1 = require("./downloads/downloads.module");
const cashs_module_1 = require("./cashs/cashs.module");
const transactions_module_1 = require("./transactions/transactions.module");
const extend_plans_module_1 = require("./extend-plans/extend-plans.module");
const commisions_module_1 = require("./commisions/commisions.module");
const roses_module_1 = require("./roses/roses.module");
const upgrades_module_1 = require("./upgrades/upgrades.module");
const satisfy_module_1 = require("./satisfy/satisfy.module");
const collab_module_1 = require("./collab/collab.module");
const keys_module_1 = require("./keys/keys.module");
const mailer_1 = require("@nest-modules/mailer");
const locations_module_1 = require("./locations/locations.module");
const rose_extends_module_1 = require("./rose-extends/rose-extends.module");
const kuma_module_1 = require("./kuma/kuma.module");
const cloulds_module_1 = require("./cloulds/cloulds.module");
const providers_module_1 = require("./providers/providers.module");
const cloud_managers_module_1 = require("./cloud-managers/cloud-managers.module");
const bullmq_1 = require("@nestjs/bullmq");
const test_module_1 = require("./test/test.module");
const tests_schema_1 = require("./schemas/tests.schema");
const config_database_service_1 = require("./middleware/config-database.service");
const check_active_middleware_1 = require("./middleware/check-active.middleware");
let AppModule = class AppModule {
    constructor(configDatabaseService) {
        this.configDatabaseService = configDatabaseService;
    }
    async configure(consumer) {
        const isActive = await this.configDatabaseService.isActive();
        if (isActive && isActive.value === '0') {
            consumer
                .apply(check_active_middleware_1.CheckActiveMiddleware)
                .exclude({ path: '/api/test/(.*)', method: common_1.RequestMethod.ALL })
                .forRoutes('*');
        }
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Test', schema: tests_schema_1.TestSchema }]),
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_DATABASE_URL'),
                }),
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            mailer_1.MailerModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get('MAIL_HOST'),
                        secure: false,
                        auth: {
                            user: configService.get('MAIL_USER'),
                            pass: configService.get('MAIL_PASSWORD'),
                        },
                        tls: {
                            rejectUnauthorized: false,
                        },
                    },
                    defaults: {
                        from: `"VPN" <${configService.get('MAIL_FROM')}>`,
                    },
                }),
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            bullmq_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    connection: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            plans_module_1.PlansModule,
            gists_module_1.GistsModule,
            servers_module_1.ServersModule,
            contacts_module_1.ContactsModule,
            downloads_module_1.DownloadsModule,
            cashs_module_1.CashsModule,
            transactions_module_1.TransactionsModule,
            extend_plans_module_1.ExtendPlansModule,
            commisions_module_1.CommisionsModule,
            roses_module_1.RosesModule,
            upgrades_module_1.UpgradesModule,
            satisfy_module_1.SatisfyModule,
            collab_module_1.CollabModule,
            keys_module_1.KeysModule,
            locations_module_1.LocationsModule,
            rose_extends_module_1.RoseExtendsModule,
            kuma_module_1.KumaModule,
            cloulds_module_1.ClouldsModule,
            providers_module_1.ProvidersModule,
            cloud_managers_module_1.CloudManagersModule,
            test_module_1.TestModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_1.JwtService, config_database_service_1.ConfigDatabaseService],
    }),
    __metadata("design:paramtypes", [config_database_service_1.ConfigDatabaseService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map