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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../auth/decorator/get-user.decorator");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const appointment_service_1 = require("./appointment.service");
const create_appointment_dto_1 = require("./dto/create-appointment.dto");
const edit_appointment_dto_1 = require("./dto/edit-appointment.dto");
let AppointmentController = class AppointmentController {
    constructor(appointmentService) {
        this.appointmentService = appointmentService;
    }
    getAppointment(userId) {
        return this.appointmentService.getAppointment(userId);
    }
    getAppointmentById(userId, appointmentId) {
        return this.appointmentService.getAppointmentById(userId, appointmentId);
    }
    createAppointment(user, dto) {
        return this.appointmentService.createAppointment(user, dto);
    }
    editAppointment(userId, appointmentId, dto) {
        return this.appointmentService.editAppointment(userId, appointmentId, dto);
    }
    deleteAppointment(userId, appointmentId) {
        return this.appointmentService.deleteAppointment(userId, appointmentId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.default)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "getAppointment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, get_user_decorator_1.default)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "getAppointmentById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, get_user_decorator_1.default)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_appointment_dto_1.default]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "createAppointment", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, get_user_decorator_1.default)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, edit_appointment_dto_1.default]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "editAppointment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, get_user_decorator_1.default)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AppointmentController.prototype, "deleteAppointment", null);
AppointmentController = __decorate([
    (0, common_1.Controller)('appointment'),
    (0, common_1.UseGuards)(jwt_guard_1.default),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService])
], AppointmentController);
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointment.controller.js.map