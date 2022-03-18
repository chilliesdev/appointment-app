import { IsEmail, IsOptional, IsString } from "class-validator";

export class editUser {
    @IsString()
    @IsOptional()
    name?: string;
    
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;

    hash?: string;
}