import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SigninDto, SignupDto } from '../src/auth/dto';
import { editUser } from '../src/user/dto/editUser.dto';
import {
  CreateAppointmentDto,
  EditAppointmentDto,
} from '../src/appointment/dto';

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
    pactum.request.setBaseUrl('http://localhost:8000');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('signup', () => {
      const dto: SignupDto = {
        email: 'email@email.com',
        name: 'user1',
        password: 'password',
      };

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
            email: '',
            name: '',
            password: '',
          })
          .expectBodyContains({
            statusCode: 400,
            message: [
              'name should not be empty',
              'email should not be empty',
              'email must be an email',
              'password should not be empty',
            ],
            error: 'Bad Request',
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
        password: 'password',
      };

      it('should check if field is empty', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('should check if email is incorrect', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'email1@email.com',
            password: 'password',
          })
          .expectBodyContains('message')
          .expectStatus(403);
      });

      it('should check if email is incorrect', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'email@email.com',
            password: 'password1',
          })
          .expectBodyContains('message')
          .expectStatus(403);
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
          Authorization: 'Bearer $S{userAt}',
        })
        .expectStatus(200);
    });

    describe('Edit User', () => {
      const dto: editUser = {
        email: 'email1@email.com',
        password: 'password1',
      };

      it('should update user', () => {
        return pactum
          .spec()
          .patch('/user')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Filter User', () => {
      const expectedOutput = [
        {
          name: 'user1',
          email: 'email1@email.com',
        },
      ];

      it('should filter users by name and email', () => {
        return pactum
          .spec()
          .get('/user/filter')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withQueryParams({
            email: 'email1@email.com',
            name: 'user1',
          })
          .expectJsonLike(expectedOutput);
      });

      it('should filter users by email', () => {
        return pactum
          .spec()
          .get('/user/filter')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withQueryParams({
            email: 'email1',
          })
          .expectJsonLike(expectedOutput);
      });

      it('should filter users by name', () => {
        return pactum
          .spec()
          .get('/user/filter')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withQueryParams({
            name: 'use',
          })
          .expectJsonLike(expectedOutput);
      });
    });
  });

  describe('Appointments', () => {
    let startDate = new Date('22 April 2022 14:00 UTC');
    let endDate = new Date('22 April 2022 14:30 UTC');

    describe('Signup another user', () => {
      const dto: SignupDto = {
        email: 'email2@email.com',
        name: 'user2',
        password: 'password',
      };

      it('should signup new user(User 2)', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores('userAt2', 'access_token');
      });

      it('should get user(User 2)', () => {
        return pactum
          .spec()
          .get('/user')
          .withHeaders({
            Authorization: 'Bearer $S{userAt2}',
          })
          .expectStatus(200)
          .stores('userId2', 'id');
      });
    });

    describe('Create appointments', () => {
      interface CreateAppointmentDtoTest
        extends Omit<CreateAppointmentDto, 'guestId'> {
        guestId: string;
      }

      const dto: CreateAppointmentDtoTest = {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        title: 'Test Appointment',
        allDay: false,
        description: 'Test Appointment',
        guestId: '$S{userId2}',
      };

      it('should create appointment', () => {
        return pactum
          .spec()
          .post('/appointment')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('appointmentId', 'id')
          .inspect();
      });
    });

    describe('Edit appointment', () => {
      interface EditAppointmentDtoTest
        extends Omit<EditAppointmentDto, 'guestId'> {
        guestId: string;
      }

      const dto: EditAppointmentDtoTest = {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        title: 'Test Appointment',
        allDay: false,
        description: 'Test Appointment',
        guestId: '$S{userId2}',
      };

      it('should update appointment', () => {
        return pactum
          .spec()
          .patch('/appointment/$S{appointmentId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });

    describe('Get Appointment', () => {
      it('should get all appointments', () => {
        return pactum
          .spec()
          .get('/appointment')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });

      it('should get appointment by id', () => {
        return pactum
          .spec()
          .get('/appointment/$S{appointmentId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Delete Appointment', () => {
      it('should delete appointment by id', () => {
        return pactum
          .spec()
          .delete('/appointment/$S{appointmentId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
  });
});
