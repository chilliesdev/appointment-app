"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AppointmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
const prisma_service_1 = require("../prisma/prisma.service");
let AppointmentService = AppointmentService_1 = class AppointmentService {
    constructor(prisma, schedulerRegistry, mailerService, config) {
        this.prisma = prisma;
        this.schedulerRegistry = schedulerRegistry;
        this.mailerService = mailerService;
        this.config = config;
        this.logger = new common_1.Logger(AppointmentService_1.name);
    }
    getAppointment(userId) {
        return this.prisma.appointment.findMany({
            where: {
                hostId: userId,
            },
        });
    }
    getAppointmentById(userId, appointmentId) {
        return this.prisma.appointment.findFirst({
            where: {
                id: appointmentId,
                hostId: userId,
            },
        });
    }
    async createAppointment(user, dto) {
        const appointment = await this.prisma.appointment.create({
            data: Object.assign({ hostId: user.id }, dto),
            include: {
                guest: true,
                host: true,
            },
        });
        const startTime = new Date(appointment.start);
        const reminderTime = new Date(startTime.valueOf() - this.config.get('REMINDER_TIME') * 60000);
        this.addCronJob(`schedule-reminder-mail-job-${appointment.id}`, reminderTime, async () => {
            this.sendReminderMail(appointment.host, appointment);
            this.sendReminderMail(appointment.guest, appointment);
        });
        return appointment;
    }
    async editAppointment(userId, appointmentId, dto) {
        const appointment = await this.prisma.appointment.findUnique({
            where: {
                id: appointmentId,
            },
        });
        if (!appointment || appointment.hostId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        return this.prisma.appointment.update({
            where: {
                id: appointmentId,
            },
            data: Object.assign({}, dto),
        });
    }
    async deleteAppointment(userId, appointmentId) {
        const appointment = await this.prisma.appointment.findUnique({
            where: {
                id: appointmentId,
            },
        });
        if (!appointment || appointment.hostId !== userId)
            throw new common_1.ForbiddenException('Access to resources denied');
        return this.prisma.appointment.delete({
            where: {
                id: appointmentId,
            },
        });
    }
    addCronJob(name, date, callback) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const formatedDate = date.toLocaleString('en-US', {
            timeZone: timezone,
        });
        try {
            const job = new cron_1.CronJob(new Date(formatedDate), callback);
            this.schedulerRegistry.addCronJob(name, job);
            job.start();
            this.logger.warn(`job ${name} added for ${date}!`);
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async sendReminderMail(user, appointment) {
        const duration = (start, end) => {
            const difference = new Date(end).valueOf() - new Date(start).valueOf();
            const minutes = Math.round(difference / 60000);
            return minutes;
        };
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Appointment Reminder',
                template: 'appointmentReminder',
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
        }
        catch (error) {
            this.logger.error(error);
        }
    }
};
AppointmentService = AppointmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.default,
        schedule_1.SchedulerRegistry,
        mailer_1.MailerService,
        config_1.ConfigService])
], AppointmentService);
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=appointment.service.js.map