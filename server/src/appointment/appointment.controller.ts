import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import GetUser from '../auth/decorator/get-user.decorator';
import JwtGuard from '../auth/guard/jwt.guard';
import { AppointmentService } from './appointment.service';
import CreateAppointmentDto from './dto/create-appointment.dto';
import EditAppointmentDto from './dto/edit-appointment.dto';

@Controller('appointment')
@UseGuards(JwtGuard)
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get()
  getAppointment(@GetUser('id') userId: number) {
    return this.appointmentService.getAppointment(userId);
  }

  @Get(':id')
  getAppointmentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) appointmentId: number,
  ) {
    return this.appointmentService.getAppointmentById(userId, appointmentId);
  }

  @Post()
  createAppointment(@GetUser() user: User, @Body() dto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(user, dto);
  }

  @Patch(':id')
  editAppointment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) appointmentId: number,
    @Body() dto: EditAppointmentDto,
  ) {
    return this.appointmentService.editAppointment(userId, appointmentId, dto);
  }

  @Delete(':id')
  deleteAppointment(
    @GetUser('id', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) appointmentId: number,
  ) {
    return this.appointmentService.deleteAppointment(userId, appointmentId);
  }
}
