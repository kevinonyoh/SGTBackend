import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChapterDto, CreateCourseDto, CreateQuestionDto, CreateQuizDto, GetCourseByTypeDto, GetCourseDto, GetPastQuestionDto, GetQuestionDto, GetQuizByTypeDto, GetUserPageCourses, QuizAttemptDto, RatingDto, RecommendedCourseDto, UpdateChapterDto, UpdateCourseDto, UpdateQuestionDto, updateQuizDto } from './dto/create-course.dto';
import { CoursesRepository } from './repositories/course.repository';
import { ChapterRepository } from './repositories/chapter.repository';
import { QuestionRepository } from './repositories/question.repository';
import { QuizRepository } from './repositories/quiz.repository';
import { QuizAttemptRepository } from './repositories/QuizAttempt.repository';
import { Op, Sequelize, Transaction, where } from 'sequelize';
import { QuizModel } from './models/quiz.model';
import { ChapterModel } from './models/chapter.model';
import { IUser } from '../users/interfaces/users.interface';
import { IQuestionType, IQuizType } from './interfaces/courses.interface';
import { CoursesModel } from './models/course.model';
import { QuestionModel } from './models/question.model';
import { PaymentRepository } from '../payment/repositories/payment.repository';
import { CourseRatingRepository } from './repositories/course-rating.repository';
import { CourseRatingModel } from './models/course-rating.model';
import { IStatus } from '../payment/interface/payment.interface';
import * as helper from "src/common/utils/helper";

@Injectable()
export class CoursesService {
  constructor(
    private readonly courseRepository: CoursesRepository,
    private readonly chapterRepository: ChapterRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly quizRepository: QuizRepository,
    private readonly quizAttemptRepository:QuizAttemptRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly courseRatingRepository: CourseRatingRepository,
    
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
      explanatoryVideoUrl: q.explanatoryVideoUrl || null,
      year: q.year || null,
      diet: q.diet || null,
      answerOptions: q.answerOptions
    }));


  return await this.questionRepository.bulkCreate(questions, transaction);

  }

  async findPastQuestion(quizId: string, data: GetPastQuestionDto){
    const {page, limit, timeLimit, year, diet} = data;

    const quiz = await this.quizRepository.findOne({id: quizId});

    if(!quiz) throw new BadRequestException("Quiz does not exist");

    let quizJson;

    let question : any;

    quizJson = quiz.toJSON();

    const defaultLimit = quizJson.default;   
    
    if(timeLimit) quizJson["timeLimit"] = timeLimit;

    quizJson["year"] =  year;
    
    quizJson["diet"] = diet;

    if(limit && !timeLimit) {
       const val = helper.calculateNewTimeLimit(limit, defaultLimit, quizJson.timeLimit);
       
       quizJson["timeLimit"] = val;
    }

    if( defaultLimit > 0 && !limit  ){
      question = await this.questionRepository.findAllPaginated({quizId, year, diet}, null, {page: 1, limit: defaultLimit });

     
     } 

    if(defaultLimit === 0 || limit){
      
      question = await this.questionRepository.findAllPaginated({quizId, year, diet}, null, {page, limit});
        
    } 

    return {
      ...quizJson,
      question  
    }

  }

  async findQuestion(quizId: string, data: GetCourseDto){

     const {page, limit, timeLimit} = data;

    let question : any;


    const quiz = await this.quizRepository.findOne({id: quizId});

    if(!quiz) throw new BadRequestException("Quiz does not exist");

    let quizJson;

    quizJson = quiz.toJSON();

    const defaultLimit = quizJson.default;   
    
    if(timeLimit) quizJson["timeLimit"] = timeLimit;

    if(limit && !timeLimit) {
       const val = helper.calculateNewTimeLimit(limit, defaultLimit, quizJson.timeLimit);
       
       quizJson["timeLimit"] = val;
    }

    if(quiz["questionType"] === IQuestionType.general_question) return await this.handleGeneralQuestionType(quiz, data, quizJson);
    
    if( defaultLimit > 0 && !limit  ){
      question = await this.questionRepository.findAllPaginated({quizId}, null, {page: 1, limit: defaultLimit });
     } 

    if(defaultLimit === 0 || limit){
      question = await this.questionRepository.findAllPaginated({quizId}, null, {page, limit});
     
      const {total} = question;

        
    } 

    return {
      ...quizJson,
      question  
    }

  }


  async findCourse(id: string){
    
    const includeOption = {
      attributes: {
        include: [
          
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "courses_chapters"
            WHERE "courses_chapters"."course_id" = "CoursesModel"."id"
          )`),
          'totalChapters'
        ],

          [
            Sequelize.literal(`(
              SELECT json_build_object(
                'rating', ROUND(AVG(r.rating)::numeric, 1),
                'total', COUNT(r.id)
              )
              FROM "course_ratings" r
              WHERE r."course_id" = "CoursesModel"."id"
            )`),
            'ratingStats'
          ]
        ]
      },
      include: [
          { 
            model: ChapterModel
          },
          {
             model: QuizModel
          }
      ],
      order: [['createdAt', 'DESC']],
    }

    return await this.courseRepository.findOne({id}, <unknown>includeOption);

  }

  async findAllCourse( data: GetCourseByTypeDto){

    const {page, limit, ...rest} = data;

    const includeOption = {
      attributes: {
        include: [
          
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "courses_chapters"
            WHERE "courses_chapters"."course_id" = "CoursesModel"."id"
          )`),
          'totalChapters'
        ],

        [
          Sequelize.literal(`(
            SELECT json_build_object(
              'rating', ROUND(AVG(r.rating)::numeric, 1),
              'total', COUNT(r.id)
            )
            FROM "course_ratings" r
            WHERE r."course_id" = "CoursesModel"."id"
          )`),
          'ratingStats'
        ]
        
        ]
      },
      include: [
          { 
            model: ChapterModel
          },
          {
             model: QuizModel
          }
      ],
      order: [['createdAt', 'DESC']],
    }

    return await this.courseRepository.findAllPaginated({ ...rest }, <unknown>includeOption, {page, limit});

  }

  async getUsersCourseById(id: string){
    
    const includeOption = {
      attributes: {
        include: [
          
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "courses_chapters"
            WHERE "courses_chapters"."course_id" = "CoursesModel"."id"
          )`),
          'totalChapters'
        ],

          [
            Sequelize.literal(`(
              SELECT json_build_object(
                'rating', ROUND(AVG(r.rating)::numeric, 1),
                'total', COUNT(r.id)
              )
              FROM "course_ratings" r
              WHERE r."course_id" = "CoursesModel"."id"
            )`),
            'ratingStats'
          ]
        ]
      },
      
      order: [['createdAt', 'DESC']],
    }

    return await this.courseRepository.findOne({id}, <unknown>includeOption);

  }

  async getUserPageCourses(data: GetUserPageCourses){

    const {page, limit, ...rest} = data;

    const includeOption = {
      attributes: {
        include: [
          
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "courses_chapters"
            WHERE "courses_chapters"."course_id" = "CoursesModel"."id"
          )`),
          'totalChapters'
        ],

          [
            Sequelize.literal(`(
              SELECT json_build_object(
                'rating', ROUND(AVG(r.rating)::numeric, 1),
                'total', COUNT(r.id)
              )
              FROM "course_ratings" r
              WHERE r."course_id" = "CoursesModel"."id"
            )`),
            'ratingStats'
          ]
        ]
      },

      order: [['createdAt', 'DESC']],
    }

    return await this.courseRepository.findAllPaginated({ ...rest }, <unknown>includeOption, {page, limit});


  }


  async deleteCourse(id: string, transaction: Transaction){

    await this.courseRepository.delete({id}, transaction);

  }


 async courseRating(user: IUser, courseId: string, data: RatingDto, transaction: Transaction){

    const course = await this.courseRepository.findOne({id: courseId});

    if(!course) throw new BadRequestException("Course does not exist");
  
    const payment = await this.paymentRepository.findOne({userId: user.id, courseId});

    if(!payment) throw new BadRequestException("user have not buy the course yet");

    const courseRating = await this.courseRatingRepository.findOne({userId: user.id, courseId});

    if(courseRating) throw new BadRequestException("User have already rate this course");
    
    await this.courseRatingRepository.create({userId: user.id, courseId, ...data}, transaction);
 }


 async userAttemptQuiz(user: IUser, data: QuizAttemptDto, transaction: Transaction) {
  const { quizId, attemptNumber, score, userAnswers } = data;

  const attemptData = await this.quizAttemptRepository.findOne({userId: user.id, quizId});

  const filteredAnswers = userAnswers.map(ans => ({
    questionId: ans.questionId,
    answer: ans.answer
  }));

  const payload = {
    attemptNumber,
    score,
    userAnswers: filteredAnswers
  };

  if(!attemptData) return await this.quizAttemptRepository.create({ userId: user.id, quizId, ...payload}, transaction);

  return await this.quizAttemptRepository.update({userId: user.id, quizId}, {...payload}, transaction);
}



async reviewQuiz(user: IUser, quizId: string) {
  const userAttempt = await this.quizAttemptRepository.findOne({ userId: user.id, quizId });

  if (!userAttempt) {
    throw new BadRequestException("User has not attempted this quiz yet");
  }

  const { userAnswers } = userAttempt.toJSON();

  const questionIds = userAnswers.map(a => a.questionId);

  const questions = await this.questionRepository.findAll( { id: { [Op.in]: questionIds } });

  
  const questionWithAnswer = questions.map(question => {
    const userAnswer = userAnswers.find(a => a.questionId === question.id);
    return {
      ...question.toJSON(),
      userAnswer: userAnswer?.answer || null
    };
  });

  return {
    score: userAttempt.score,
    attemptNumber: userAttempt.attemptNumber,
    questions: questionWithAnswer
  };
}



  async findChapters(courseId: string){
    const includeOption = {
      include: [
        {
          model: ChapterModel
        }
      ],

      order: [['createdAt', 'DESC']]

    }

    return await this.courseRepository.findAll({id: courseId}, <unknown>includeOption);

  }

  async findQuizByQuestionType(courseId: string, data: GetQuizByTypeDto){
    
    const {questionType} = data;

    const quizType = await this.quizRepository.findOne({courseId, questionType});

    const quizTypeJson = quizType.toJSON();

    if(quizType["questionType"] === IQuestionType.general_question) return await this.handleAllGeneralQuestionType(quizType, quizTypeJson)

    const includeOption = {
      include: [
        {
          model: CoursesModel
        },
        {
          model: QuestionModel
        }
      ],

      order: [['createdAt', 'DESC']]

    }

    return await this.quizRepository.findAll({ courseId, questionType }, <unknown>includeOption);
  }

  async updateCourse(id: string, data: UpdateCourseDto, transaction: Transaction){
    
    return await this.courseRepository.update({id}, {...data}, transaction);

  }

  async updateQuestion(quizId: string, id: string, data: UpdateQuestionDto, transaction: Transaction){
    
    return await this.questionRepository.update({quizId, id}, {...data}, transaction);

  }

  async deleteQuestion(quizId:string, id: string, transaction: Transaction){
      await this.questionRepository.delete({id, quizId}, transaction);
  }

  async deleteQuiz(courseId:string, id:string, transaction: Transaction){
     await this.quizRepository.delete({courseId, id}, transaction);
  }

  async deleteChapter(courseId:string, id:string, transaction: Transaction){
     await this.chapterRepository.delete({courseId, id}, transaction);
  }

  async updateQuiz(courseId:string, id:string, data: updateQuizDto, transaction: Transaction){
     return await this.quizRepository.update({courseId, id}, {...data}, transaction);
  }

  async deleteSection(courseId:string, id:string,  publicId: string, transaction: Transaction){
    const chapter = await this.chapterRepository.findOne({ courseId, id });

    if(!chapter) throw new BadRequestException("Chapter does not exist");

    const sections = chapter.sections.filter(section => section.publicId !== publicId);

    return await this.chapterRepository.update({ courseId, id }, { sections }, transaction);
  }

  async updateChapter(courseId:string, id:string, data: UpdateChapterDto, transaction: Transaction){
    
    const chapter = await this.chapterRepository.findOne({ courseId, id });

    if(!chapter) throw new BadRequestException("Chapter does not exist");

    if(data["sections"]) data["sections"] = [...chapter["sections"], ...data["sections"]];

    return await this.chapterRepository.update({courseId, id}, {...data}, transaction);
  }

  async recommendedCourse(data: RecommendedCourseDto){

    const { page, limit } = data;

    const includeOption = {
     
      attributes: [
        'courseId',
        [Sequelize.fn('COUNT', Sequelize.col('course_id')), 'salesCount']
      ],
      include: [
        {
          model: CoursesModel,
          attributes: {
            include: [
              [
                Sequelize.literal(`(
                  SELECT json_build_object(
                    'rating', ROUND(AVG(r.rating)::numeric, 1),
                    'total', COUNT(r.id)
                  )
                  FROM "course_ratings" r
                  WHERE r."course_id" = "course"."id"
                )`),
                "ratingStats"
              ]
            ]
          }
        }
      ],
      group: ['courseId', 'course.id'], 
      order: [[Sequelize.literal(`"salesCount"`), 'DESC']],
      limit: 50
    };
    
    return await this.paymentRepository.findAll({ status: IStatus.successful }, <unknown>includeOption);
    
  }


  private async handleGeneralQuestionType(quiz: any, data: GetCourseDto, quizJson: any) {
    const { page, limit, timeLimit } = data;
    
    const defaultLimit = quizJson.default;
  
    const pastQuizzes = await this.quizRepository.findAll({ courseId: quiz.courseId, questionType: IQuestionType.past_question  });
  
    const quickQuizzes = await this.quizRepository.findAll({  courseId: quiz.courseId,  questionType: IQuestionType.quick_question });
  
    const quizIds = [
      ...pastQuizzes.map((q) => q.id),
      ...quickQuizzes.map((q) => q.id),
    ];
  
    if (quizIds.length === 0) {
      throw new BadRequestException("No past or quick quizzes available for this course");
    }
  
    const questions = await this.questionRepository.findAll({ quizId: quizIds });
  
    if (questions.length === 0) {
      throw new BadRequestException("No questions available for general question type");
    }
  

    const uniqueQuestions = Array.from(
      new Map(questions.map((q) => [q.id, q])).values()
    );
  
    const shuffled = uniqueQuestions.sort(() => Math.random() - 0.5);
  
    if (shuffled.length > uniqueQuestions.length) {
      shuffled.length = uniqueQuestions.length;
    }
  
    const totalAvailable = shuffled.length;
    const finalLimit = limit || defaultLimit;
  
  
    // const startIndex = (page - 1) * finalLimit;
    // const paginatedQuestions = shuffled.slice(
    //   startIndex,
    //   startIndex + finalLimit
    // );
  
    if (timeLimit) quizJson["timeLimit"] = timeLimit;
  
    return {
      ...quizJson,
      question: {
        total: totalAvailable,
        rows: shuffled,
      },
    };
  }


  private async handleAllGeneralQuestionType(quiz: any, quizJson: any) {

    const pastQuizzes = await this.quizRepository.findAll({
      courseId: quiz.courseId,
      questionType: IQuestionType.past_question
    });
  
    const quickQuizzes = await this.quizRepository.findAll({
      courseId: quiz.courseId,
      questionType: IQuestionType.quick_question
    });
  
    const quizIds = [
      ...pastQuizzes.map((q) => q.id),
      ...quickQuizzes.map((q) => q.id),
    ];
  
    if (quizIds.length === 0) {
      throw new BadRequestException("No past or quick quizzes available for this course");
    }
  
    const questions = await this.questionRepository.findAll({ quizId: quizIds });
  
    if (questions.length === 0) {
      throw new BadRequestException("No questions available for general question type");
    }
  
    const uniqueQuestions = Array.from(
      new Map(questions.map((q) => [q.id, q])).values()
    );
  
    const shuffled = uniqueQuestions.sort(() => Math.random() - 0.5);
  
    return {
      ...quizJson,
      question: {
        total: shuffled.length,
        rows: shuffled,
      },
    };
  }
  
  

}
