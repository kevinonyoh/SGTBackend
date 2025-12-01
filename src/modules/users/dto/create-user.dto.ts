import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ICoursesInterest } from "../interfaces/users.interface";

export class CreateUserDto {
  
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    phoneNumber: string;

    @IsArray()
    @ArrayNotEmpty() 
    @IsEnum(ICoursesInterest, { each: true })
    coursesInterest: ICoursesInterest[];

    @IsString()
    @IsNotEmpty()
    password: string;

}

export class GetOtpDto{

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
}


export class EmailVerificationDto{
    
    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

}

export class ForgotPasswordDto{

    @IsEmail()
    @IsNotEmpty()
    email: string;

}


export class VerifyForgotPasswordOtpDto{
    
    @IsString()
    @IsNotEmpty()
    otp: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;


}

export class changePasswordDto{

    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;

}


export class PageLimitDto{
    @IsNumber()
    @IsOptional()
    page: number;
 
    @IsNumber()
   @IsOptional()
    limit: number;
}