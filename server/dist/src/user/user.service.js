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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async editUser(userId, dto) {
        let data = dto;
        if (dto.password) {
            const hash = await argon.hash(dto.password);
            data.hash = hash;
        }
        delete data.password;
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data,
        });
        return user;
    }
    async filterUser(email, name) {
        const user = await this.prisma.user.findMany({
            where: {
                email: {
                    contains: email,
                },
                OR: {
                    name: {
                        contains: name,
                    },
                },
            },
            select: {
                name: true,
                email: true,
                id: true,
            },
        });
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.default])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map