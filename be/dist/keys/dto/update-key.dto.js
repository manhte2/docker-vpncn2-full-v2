"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateKeyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_key_dto_1 = require("./create-key.dto");
class UpdateKeyDto extends (0, swagger_1.PartialType)(create_key_dto_1.CreateKeyDto) {
}
exports.UpdateKeyDto = UpdateKeyDto;
//# sourceMappingURL=update-key.dto.js.map