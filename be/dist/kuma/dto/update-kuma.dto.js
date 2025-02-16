"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKumaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_kuma_dto_1 = require("./create-kuma.dto");
class UpdateKumaDto extends (0, swagger_1.PartialType)(create_kuma_dto_1.CreateKumaDto) {
}
exports.UpdateKumaDto = UpdateKumaDto;
//# sourceMappingURL=update-kuma.dto.js.map