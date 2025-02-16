"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCollabDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_collab_dto_1 = require("./create-collab.dto");
class UpdateCollabDto extends (0, swagger_1.PartialType)(create_collab_dto_1.CreateCollabDto) {
}
exports.UpdateCollabDto = UpdateCollabDto;
//# sourceMappingURL=update-collab.dto.js.map