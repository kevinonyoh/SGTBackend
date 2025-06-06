import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateChapterDto, CreateCourseDto, CreateQuestionDto, CreateQuizDto, GetCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Role } from 'src/common/decorators/role.decorator';
import { IRole } from '../admin/interfaces/admin.interface';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Role(IRole.SUPER_ADMIN, IRole.MANAGE_COURSES)
  @Post("create")
  @HttpCode(201)
  @ResponseMessage("new courses created successfully")
  async createCourse(@Body() body: CreateCourseDto, @TransactionParam() transaction: Transaction){
    return await this.coursesService.createCourse(body, transaction)
  }

  @Role(IRole.SUPER_ADMIN, IRole.MANAGE_COURSES)
  @Put("create/chapter/:courseId")
  @HttpCode(200)
  @ResponseMessage("chapter successfully added")
  async addChapter(@Param("courseId") courseId: string, @Body() body: CreateChapterDto, @TransactionParam() transaction: Transaction){
    return await this.coursesService.addChapter(courseId, body, transaction);
  }

  @Role(IRole.SUPER_ADMIN, IRole.MANAGE_COURSES)
  @Put("create/quiz/:courseId")
  @HttpCode(200)
  @ResponseMessage("quiz successfully added")
  async addQuiz(@Param("courseId") courseId: string, @Body() body: CreateQuizDto, @TransactionParam() transaction: Transaction){
    return await this.coursesService.addQuiz(courseId, body, transaction);
  }

  @Role(IRole.SUPER_ADMIN, IRole.MANAGE_COURSES)
  @Put("create/quiz/question/:quizId")
  @HttpCode(200)
  @ResponseMessage("question successfully added")
  async addQuestion(@Param("quizId") quizId: string, @Body() body: CreateQuestionDto[], @TransactionParam() transaction: Transaction){
    return await this.coursesService.addQuestionToQuiz(quizId, body, transaction);
  }

  @Role(IRole.SUPER_ADMIN, IRole.MANAGE_COURSES)
  @Delete("remove/:id")
  @HttpCode(204)
  @ResponseMessage("course remove successfully")
  async removeCourse(@Param("id") id: string, @TransactionParam() transaction: Transaction){
    return await this.coursesService.deleteCourse(id, transaction);
  }


  @Public()
  @Get(":id")
  @HttpCode(200)
  @ResponseMessage("course details")
  async getCourse(@Param("id") id: string){
     return await this.coursesService.findCourse(id);
  }

  @Public()
  @Get()
  @HttpCode(200)
  @ResponseMessage("Courses details")
  async getCourses(@Body() body:GetCourseDto){
     return await this.coursesService.findAllCourse(body);
  }


  
}
