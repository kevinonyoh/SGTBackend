import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IQuizType } from "../interfaces/courses.interface";
import { CoursesModel } from "./course.model";
import { QuestionModel } from "./question.model";

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

    @AllowNull
    @Column(DataType.INTEGER)
    timeLimit: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    numberOfQuestions: number;

    @AllowNull(false)
    @Column(DataType.ENUM(IQuizType.multiple_choice, IQuizType.short_answer, IQuizType.true_false))
    type: IQuizType;

    @ForeignKey(() => CoursesModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    courseId: string;

    @BelongsTo(() => CoursesModel)
    course: CoursesModel;

    @HasMany(() => QuestionModel)
    questions: QuestionModel[];

}