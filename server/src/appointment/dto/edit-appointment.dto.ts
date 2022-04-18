import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditAppointmentDto {
  @IsOptional()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  guestId: number;
}
