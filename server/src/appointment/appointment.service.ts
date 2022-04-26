import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import PrismaService from '../prisma/prisma.service';
import CreateAppointmentDto from './dto/create-appointment.dto';
import EditAppointmentDto from './dto/edit-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

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

  createAppointment(userId: number, dto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        hostId: userId,
        ...dto,
      },
    });
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

  @Cron(CronExpression.EVERY_30_SECONDS)
  sendReminderEmail() {
    this.logger.debug('Email Sent Every Second');
  }
}
