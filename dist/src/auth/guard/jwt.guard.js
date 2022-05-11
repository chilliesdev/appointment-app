"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("@nestjs/passport");
class JwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
}
exports.default = JwtGuard;
//# sourceMappingURL=jwt.guard.js.map