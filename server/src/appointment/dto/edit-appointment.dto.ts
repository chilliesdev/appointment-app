import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class EditAppointmentDto {
    @IsOptional()
    @IsDateString()
    date: string;

    @IsOptional()
    @IsString()
    description?: string;

    // @IsNotEmpty()
    // @IsNumber()
    // hostId: number;

    @IsOptional()
    @IsNumber()
    guestId: number;
}