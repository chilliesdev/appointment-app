import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto, EditAppointmentDto } from './dto';

@Controller('appointment')
@UseGuards(JwtGuard)
export class AppointmentController {
    constructor(private appointmentService: AppointmentService){}

    @Get()
    getAppointment(@GetUser('id') userId: number){
        return this.appointmentService.getAppointment(userId);
    }

    @Get(':id')
    getAppointmentById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) appointmentId: number
    ){
        return this.appointmentService.getAppointmentById(userId, appointmentId);
    }

    @Post()
    createAppointment(
        @GetUser('id') userId: number,
        @Body() dto: CreateAppointmentDto
    ) {
        return this.appointmentService.createAppointment(userId, dto);
    }

    @Patch(':id')
    editAppointment(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) appointmentId: number,
        @Body() dto: EditAppointmentDto
    ) {
        return this.appointmentService.editAppointment(userId, appointmentId, dto);
    }

    @Delete(':id')
    deleteAppointment(
        @GetUser('id', ParseIntPipe) userId: number,
        @Param('id', ParseIntPipe) appointmentId: number
    ) {
        return this.appointmentService.deleteAppointment(userId, appointmentId);
    }
}
