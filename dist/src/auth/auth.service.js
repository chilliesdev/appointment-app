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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const runtime_1 = require("@prisma/client/runtime");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    name: dto.name,
                    hash,
                },
            });
            delete user.hash;
            return this.signToken(user.id, user.email, user.name);
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Credentials Incorrect');
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Credentials Incorrect');
        return this.signToken(user.id, user.email, user.name);
    }
    async googleSigin(googleUser) {
        const { id, email, name, issuer } = googleUser;
        if (!googleUser)
            throw new common_1.ForbiddenException('No user from google');
        const credentials = await this.prisma.federatedCredential.findFirst({
            where: {
                provider: issuer,
                subject: id,
            },
        });
        if (!credentials) {
            const hash = await argon.hash(this.config.get('DEFAULT_PASSWORD'));
            const user = await this.prisma.user.create({
                data: {
                    name,
                    email,
                    hash,
                },
            });
            await this.prisma.federatedCredential.create({
                data: {
                    provider: issuer,
                    subject: id,
                    userId: user.id,
                },
            });
            return this.signToken(user.id, user.email, user.name);
        }
        const user = await this.prisma.user.findFirst({
            where: {
                id: credentials.userId,
            },
        });
        return this.signToken(user.id, user.email, user.name);
    }
    async signToken(userId, email, name) {
        const payload = {
            sub: userId,
            email,
            name,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30d',
            secret: secret,
        });
        return {
            access_token: token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.default,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map