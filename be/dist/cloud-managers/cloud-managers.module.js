"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudManagersModule = void 0;
const common_1 = require("@nestjs/common");
const cloud_managers_service_1 = require("./cloud-managers.service");
const cloud_managers_controller_1 = require("./cloud-managers.controller");
const mongoose_1 = require("@nestjs/mongoose");
const cloudManagers_schema_1 = require("../schemas/cloudManagers.schema");
const servers_schema_1 = require("../schemas/servers.schema");
let CloudManagersModule = class CloudManagersModule {
};
CloudManagersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: cloudManagers_schema_1.CloudManager.name, schema: cloudManagers_schema_1.CloudManagerSchema },
                { name: servers_schema_1.Server.name, schema: servers_schema_1.ServerSchema },
            ]),
        ],
        controllers: [cloud_managers_controller_1.CloudManagersController],
        providers: [cloud_managers_service_1.CloudManagersService],
    })
], CloudManagersModule);
exports.CloudManagersModule = CloudManagersModule;
//# sourceMappingURL=cloud-managers.module.js.map