import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum'
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SignupDto } from '../src/auth/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  it.todo('It should pass');

  describe('Auth', () => {

    describe('signup', () => {
      const dto: SignupDto = {
        email: "email@email.com",
        name: "user1",
        password: "password"
      }

      it('should signup', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201);
      });
      
      it('should check if fields are empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: "",
          name: "",
          password: ""
        })
        .expectBodyContains({
          "statusCode": 400,
          "message": [
            "name should not be empty",
            "email should not be empty",
            "email must be an email",
            "password should not be empty"
          ],
          "error": "Bad Request"
        });
      });
      
      it('should check if email is unique', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(403);
      });
    });
  });
});
