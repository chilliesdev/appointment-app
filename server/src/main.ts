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

  // Clear DB
  // const prisma = app.get(PrismaService);
  // await prisma.cleanDb();

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
