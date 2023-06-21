import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import PrismaService from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();

  // Connect to DB
  const prisma = app.get(PrismaService);
  await prisma.$connect();

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
