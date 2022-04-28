import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Appointment, User } from '@prisma/client';
import { CronJob } from 'cron';
import PrismaService from '../prisma/prisma.service';
import CreateAppointmentDto from './dto/create-appointment.dto';
import EditAppointmentDto from './dto/edit-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private schedulerRegistry: SchedulerRegistry,
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  private readonly logger = new Logger(AppointmentService.name);

  getAppointment(userId: number) {
    return this.prisma.appointment.findMany({
      where: {
        hostId: userId,
      },
    });
  }

  getAppointmentById(userId: number, appointmentId: number) {
    return this.prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        hostId: userId,
      },
    });
  }

  async createAppointment(user: User, dto: CreateAppointmentDto) {
    const appointment = await this.prisma.appointment.create({
      data: {
        hostId: user.id,
        ...dto,
      },
      include: {
        guest: true,
        host: true,
      },
    });

    const startTime = new Date(appointment.start);
    const reminderTime = new Date(
      startTime.valueOf() - this.config.get('REMINDER_TIME') * 60000,
    );

    this.addCronJob(
      `schedule-reminder-mail-job-${appointment.id}`,
      reminderTime,
      async () => {
        // Send Host Mail
        this.sendReminderMail(appointment.host, appointment);
        // Send Guest Mail
        this.sendReminderMail(appointment.guest, appointment);
      },
    );

    return appointment;
  }

  async editAppointment(
    userId: number,
    appointmentId: number,
    dto: EditAppointmentDto,
  ) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    // Check if user is the host
    if (!appointment || appointment.hostId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteAppointment(userId: number, appointmentId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    // Check if user is the host
    if (!appointment || appointment.hostId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
  }

  addCronJob(name: string, date: Date, callback: () => Promise<void>) {
    // convert date timezone to machine timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formatedDate = date.toLocaleString('en-US', {
      timeZone: timezone,
    });

    try {
      const job = new CronJob(new Date(formatedDate), callback);

      this.schedulerRegistry.addCronJob(name, job);
      job.start();
      this.logger.warn(`job ${name} added for ${date}!`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sendReminderMail(user: User, appointment: Appointment) {
    const duration = (start: Date, end: Date): number => {
      const difference = new Date(end).valueOf() - new Date(start).valueOf();
      const minutes = Math.round(difference / 60000);
      return minutes;
    };

    try {
      await this.mailerService.sendMail({
        to: user.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Appointment Reminder',
        template: 'appointmentReminder', // `.hbs` extension is appended automatically
        context: {
          title: appointment.title,
          host: user.name,
          hostEmail: user.email,
          date: new Date(appointment.start).toLocaleDateString(),
          time: new Date(appointment.start).toLocaleTimeString(),
          duration: appointment.allDay
            ? 'All day appointment'
            : duration(appointment.start, appointment.end),
          description: appointment.description,
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
