import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum'
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SigninDto, SignupDto } from '../src/auth/dto';

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

    describe('signin', () => {
      const dto: SigninDto = {
        email: 'email@email.com',
        password: "password"
      }

      it('should check if field is empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400);
      });
      
      it('should check if email is incorrect', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: "email1@email.com",
          password: "password"
        })
        .expectBodyContains('message')
        .expectStatus(403);
      });
      
      it('should check if email is incorrect', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: "email@email.com",
          password: "password1"
        })
        .expectBodyContains('message')
        .expectStatus(403)
      });

      it('should signin', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(201)
        .expectBodyContains('access_token')
        .stores('userAt', 'access_token');
      });

    });

  });
  
  describe('User', () => {
    it('should get user', () => {
      return pactum
      .spec()
      .get('/user')
      .withHeaders({
        Authorization: 'Bearer $S{userAt}'
      })
      .expectStatus(200);
    });

    describe('Edit User', () => {
      it('should check if empty fields', () => {
        return pactum
        .spec()
        .patch('/user')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(400)
        .inspect();
      });
    });
  });
});
