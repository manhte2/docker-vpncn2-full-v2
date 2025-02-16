"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RosesModule = void 0;
const common_1 = require("@nestjs/common");
const roses_service_1 = require("./roses.service");
const roses_controller_1 = require("./roses.controller");
const mongoose_1 = require("@nestjs/mongoose");
const roses_schema_1 = require("../schemas/roses.schema");
let RosesModule = class RosesModule {
};
RosesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: roses_schema_1.Rose.name, schema: roses_schema_1.RoseSchema }]),
        ],
        controllers: [roses_controller_1.RosesController],
        providers: [roses_service_1.RosesService],
    })
], RosesModule);
exports.RosesModule = RosesModule;
//# sourceMappingURL=roses.module.js.map