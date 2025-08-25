import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IDiet, IQuestionType, IQuizType } from "../interfaces/courses.interface";
import { CoursesModel } from "./course.model";
import { QuestionModel } from "./question.model";
import { ChapterModel } from "./chapter.model";

@Table({
    tableName: "quizzes",
    modelName: "QuizModel",
    underscored: true,
    freezeTableName: true
})
export class QuizModel extends Model<QuizModel>{
  
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    instruction: string;

    @AllowNull(false)
    @Column(DataType.ENUM(IQuizType.multiple_choice, IQuizType.short_answer, IQuizType.true_false, IQuizType.theory))
    type: IQuizType;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    year: number;

    @AllowNull(false)
    @Column(DataType.ENUM(IQuestionType.general_question, IQuestionType.past_question, IQuestionType.quick_question))
    questionType: IQuestionType;

    @AllowNull(true)
    @Column(DataType.ENUM(IDiet.may, IDiet.november))
    diet: IDiet;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    default: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    timeLimit: number;

    @ForeignKey(() => CoursesModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    courseId: string;


    @ForeignKey(() => ChapterModel)
    @AllowNull(true)
    @Column(DataType.UUID)
    chapterId: string;
    

    @BelongsTo(() => CoursesModel)
    course: CoursesModel;

    @HasMany(() => QuestionModel)
    questions: QuestionModel[];

}


