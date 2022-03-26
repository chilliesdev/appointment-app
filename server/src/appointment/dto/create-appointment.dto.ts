import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsDateString()
    date: string;

    @IsOptional()
    @IsString()
    description?: string;

    // @IsNotEmpty()
    // @IsNumber()
    // hostId: number;

    @IsNotEmpty()
    @IsNumber()
    guestId: number;
}