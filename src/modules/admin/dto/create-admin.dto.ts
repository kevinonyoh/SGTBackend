import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IRole } from "../interfaces/admin.interface";
import { Type } from "class-transformer";


export class CreateAdminDto {

    @IsString()
    @IsNotEmpty()
    fullName: string;
 
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(IRole, { each: true })
    @Type(() => String)
    role: IRole[];

}

export class UpdateAdminDto{

}


export class RemoveAdminDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

}

export class AdminResetPasswordDto{
    
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}


export class PageLimitDto{
    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    limit: number;
}