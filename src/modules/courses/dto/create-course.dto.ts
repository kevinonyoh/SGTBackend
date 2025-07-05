import { ArrayMinSize, IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ICoursesInterest } from "src/modules/users/interfaces/users.interface";
import { ICoursesLevel, IQuestionType, IQuizType } from "../interfaces/courses.interface";
import { Type } from "class-transformer";

export class CreateCourseDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsEnum(ICoursesInterest)
    @IsNotEmpty()
    courseType: ICoursesInterest;

    @IsEnum(ICoursesLevel)
    @IsNotEmpty()
    courseLevel: ICoursesLevel;

    @IsDate()
    @IsNotEmpty()
    date: Date;

}

export class CreateChapterDto{

    @IsString()
    @IsNotEmpty()
    chapterTitle: string

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    publicId: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    format: string;

    @IsString()
    @IsNotEmpty()
    resourceType: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @IsString()
    @IsOptional()
    additionalResources: string;

}



export class CreateQuizDto{
  
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    instruction: string;

    @IsEnum(IQuizType)
    @IsNotEmpty()
    type: IQuizType;

    @IsNumber()
    @IsOptional()
    year: number;

    @IsEnum(IQuestionType)
    @IsNotEmpty()
    questionType: IQuestionType;

    @IsString()
    @IsOptional()
    chapterId: string;

}


export class CreateQuestionDto{

    @IsString()
    @IsNotEmpty()
    questionContent: string;

    @IsString()
    @IsOptional()
    imagePath: string;

    @IsString()
    @IsOptional()
    imageType: string;

    @IsString()
    @IsOptional()
    publicId: string;


    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => AnswerOptionDTO)
    answerOptions: AnswerOptionDTO[]

}


class AnswerOptionDTO{

    @IsString()
    content: string;

    @IsBoolean()
    isCorrect: boolean;

    @IsString()
    @IsOptional()
    explanation?: string;

}


export class GetCourseDto{
   
    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    limit: number;

}


export class GetCourseByTypeDto{
   
    @IsNumber()
    @IsOptional()
    page: number;

    @IsNumber()
    @IsOptional()
    limit: number;

    @IsEnum(ICoursesInterest)
    @IsNotEmpty()
    type: ICoursesInterest;


}



export class QuizAttemptDto{

    @IsString()
    @IsNotEmpty()
    quizId: string;

    @IsNumber()
    @IsNotEmpty()
    attemptNumber: number;

    @IsNumber()
    @IsOptional()
    score: number;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => UserAnswersDto)
    userAnswers: UserAnswersDto[]


}


class UserAnswersDto{
    
    @IsString()
    answer: string;

    @IsString()
    questionId: string;

}