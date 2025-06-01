import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ICoursesInterest } from "src/modules/users/interfaces/users.interface";
import { Content } from "../entities/content.entity";

export class CreateContentDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsEnum(ICoursesInterest)
    @IsNotEmpty()
    categories: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

} 


export class GetContentDto {
    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    limit: number;

    @IsString()
    @IsOptional()
    searchValue: string;

}
