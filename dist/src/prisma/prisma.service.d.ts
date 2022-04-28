import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
export default class PrismaService extends PrismaClient {
    constructor(config: ConfigService);
    cleanDb(): Promise<[import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload]>;
}
