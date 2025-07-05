import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChapterDto, CreateCourseDto, CreateQuestionDto, CreateQuizDto, GetCourseByTypeDto, GetCourseDto, QuizAttemptDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './repositories/course.repository';
import { ChapterRepository } from './repositories/chapter.repository';
import { QuestionRepository } from './repositories/question.repository';
import { QuizRepository } from './repositories/quiz.repository';
import { QuizAttemptRepository } from './repositories/QuizAttempt.repository';
import { Op, Transaction } from 'sequelize';
import { QuizModel } from './models/quiz.model';
import { ChapterModel } from './models/chapter.model';
import { IUser } from '../users/interfaces/users.interface';
import { IQuizType } from './interfaces/courses.interface';

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly chapterRepository: ChapterRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly quizRepository: QuizRepository,
    private readonly quizAttemptRepository:QuizAttemptRepository
  ){}

  async createCourse(data: CreateCourseDto, transaction: Transaction){

     return await this.courseRepository.create({...data}, transaction);

  }

  async addChapter(courseId: string, data: CreateChapterDto, transaction: Transaction){
       
    const course = await this.courseRepository.findOne({id: courseId});

    if(!course) throw new BadRequestException("Course does not exist");

    return  await this.chapterRepository.create({courseId, ...data}, transaction);

  }

  
  async addQuiz(courseId: string, data: CreateQuizDto, transaction: Transaction ){

    const course = await this.courseRepository.findOne({id: courseId});

    if(!course) throw new BadRequestException("Course does not exist");

     return  await this.quizRepository.create({courseId, ...data}, transaction);

  }

  async addQuestionToQuiz(quizId: string, data: CreateQuestionDto[], transaction: Transaction){
    
    const quiz = await this.quizRepository.findOne({id: quizId});

    if(!quiz) throw new BadRequestException("Quiz does not exist");

    const questions = data.map((q) => ({
      quizId,
      questionContent: q.questionContent,
      imagePath: q.imagePath || null,
      imageType: q.imageType || null,
      publicId: q.publicId || null,
      answerOptions: q.answerOptions
    }));


  return await this.questionRepository.bulkCreate(questions, transaction);

  }

  async findQuestion(quizId: string, data: GetCourseDto){

    const {page, limit} = data;

    const quiz = await this.quizRepository.findOne({id: quizId});

    if(!quiz) throw new BadRequestException("Quiz does not exist");

    return await this.questionRepository.findAllPaginated({quizId}, null, {page, limit});

  }


  async findCourse(id: string){
    
    const includeOption = {
      include: [
        {
          model: QuizModel
        },
        {
          model: ChapterModel
        }
      ]
    }

    return await this.courseRepository.findOne({id},  <unknown>includeOption);

  }

  async findAllCourse( data: GetCourseDto){

    const {page, limit } = data;

    const includeOption = {
      include: [
        {
          model: QuizModel
        },
        {
          model: ChapterModel
        }
      ],

      order: [['createdAt', 'DESC']]

    }

    return await this.courseRepository.findAllPaginated({}, <unknown>includeOption, {page, limit});

  }


  async findByType(type: string, data: GetCourseDto){
      
    const {page, limit} = data;

    const includeOption = {

      order: [['createdAt', 'DESC']]

    }

    return await this.courseRepository.findAllPaginated({courseType: type}, <unknown>includeOption, {page, limit});


  }


  async deleteCourse(id: string, transaction: Transaction){

    await this.courseRepository.delete({id}, transaction);

  }


  async userAttemptQuiz(user: IUser, data: QuizAttemptDto, transaction: Transaction){
    
     const payload = {
        userId: user.id,
        ...data
     }


     await this.quizAttemptRepository.create(payload, transaction);


  }


  async reviewQuiz(user: IUser, quizId: string){

    
    const userAttempt = await this.quizAttemptRepository.findOne({userId: user.id, quizId});

    if(!userAttempt) throw new BadRequestException("user have not attempt quiz yet");

    const userAttemptJson = userAttempt.toJSON();

    const questionIds = userAttemptJson.userAnswers.map(answer => answer.questionId);


    const questions = await this.questionRepository.findAll({quizId});
   

    const questionWithAnswer = questions.map(question => {
        
      const userAnswer = userAttemptJson.userAnswers.find(answer => answer.questionId === question.id);

      return {
        ...question.toJSON(),
        userAnswer: userAnswer?.answer || null
      };

    });

    const {score, attemptNumber} = userAttemptJson;

    return {
      score,
      attemptNumber,
      questionWithAnswer
    }

  }


  


}
