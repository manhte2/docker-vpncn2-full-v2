"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUpgradeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_upgrade_dto_1 = require("./create-upgrade.dto");
class UpdateUpgradeDto extends (0, swagger_1.PartialType)(create_upgrade_dto_1.CreateUpgradeDto) {
}
exports.UpdateUpgradeDto = UpdateUpgradeDto;
//# sourceMappingURL=update-upgrade.dto.js.map