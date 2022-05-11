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
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleAppointments = void 0;
const mockingbird_1 = require("mockingbird");
class AppointmentEntityMock {
}
__decorate([
    (0, mockingbird_1.Mock)((faker) => faker.lorem.words(2)),
    __metadata("design:type", String)
], AppointmentEntityMock.prototype, "title", void 0);
__decorate([
    (0, mockingbird_1.Mock)(),
    __metadata("design:type", Date)
], AppointmentEntityMock.prototype, "start", void 0);
__decorate([
    (0, mockingbird_1.Mock)(),
    __metadata("design:type", Date)
], AppointmentEntityMock.prototype, "end", void 0);
__decorate([
    (0, mockingbird_1.Mock)(false),
    __metadata("design:type", Boolean)
], AppointmentEntityMock.prototype, "allDay", void 0);
__decorate([
    (0, mockingbird_1.Mock)((faker) => faker.lorem.sentence(10)),
    __metadata("design:type", String)
], AppointmentEntityMock.prototype, "description", void 0);
exports.multipleAppointments = (0, mockingbird_1.MockFactory)(AppointmentEntityMock).many(100);
//# sourceMappingURL=appointment.entity.js.map