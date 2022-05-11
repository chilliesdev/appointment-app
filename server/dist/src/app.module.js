"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const appointment_module_1 = require("./appointment/appointment.module");
const schedule_1 = require("@nestjs/schedule");
const mail_module_1 = require("./mail/mail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.default,
            prisma_module_1.default,
            appointment_module_1.AppointmentModule,
            mail_module_1.MailModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map