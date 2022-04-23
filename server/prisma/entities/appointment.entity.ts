import { Appointment } from '@prisma/client';
import { Mock, MockFactory, Faker } from 'mockingbird';
class AppointmentEntityMock
  implements
    Omit<Appointment, 'id' | 'createdAt' | 'updatedAt' | 'guestId' | 'hostId'>
{
  @Mock((faker) => faker.lorem.words(2))
  title!: string;

  @Mock()
  start!: Date;

  @Mock()
  end!: Date;

  @Mock(false)
  allDay!: boolean;

  @Mock((faker) => faker.lorem.sentence(10))
  description!: string;
}

export const multipleAppointments = MockFactory(AppointmentEntityMock).many(
  100,
);
