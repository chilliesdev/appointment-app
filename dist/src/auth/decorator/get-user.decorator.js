"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (data)
        return request.user[data];
    return request.user;
});
exports.default = GetUser;
//# sourceMappingURL=get-user.decorator.js.map