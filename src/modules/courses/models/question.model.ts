import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { QuizModel } from "./quiz.model";
import { UsersModel } from "src/modules/users/models/users.model.";
import { IDiet, IQuestion, IScenario, IUserAnswers } from "../interfaces/courses.interface";
import { ICoursesInterest } from "src/modules/users/interfaces/users.interface";
import { All } from "@nestjs/common";




@Table({
    tableName: "questions",
    modelName: "QuestionModel",
    underscored: true,
    freezeTableName: true
})
export class QuestionModel extends Model<QuestionModel>{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @ForeignKey(() => QuizModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    quizId: string;

    @BelongsTo(() => QuizModel)
    quiz: QuizModel;

    @AllowNull(false)
    @Column
    questionContent: string;

    @AllowNull(true)
    @Column
    imagePath: string;
    
    @AllowNull(true)
    @Column
    imageType: string;

    @AllowNull(true)
    @Column
    publicId: string;

    @AllowNull(true)
    @Column
    explanatoryVideoUrl: string;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    year: number;

    @AllowNull(true)
    @Column(DataType.ENUM(IDiet.may, IDiet.november, IDiet.march, IDiet.september))
    diet: IDiet;

    @AllowNull(true)
    @Column(DataType.ENUM(ICoursesInterest.ATS, ICoursesInterest.ICAN, ICoursesInterest.Olevel))
    courseType: ICoursesInterest;

    @AllowNull(true)
    @Column(DataType.TEXT)
    explanatoryNote: string;

    @AllowNull(true)
    @Column(DataType.JSONB)
    scenarios: IScenario;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    index: number;

    @AllowNull(true)
    @Column(DataType.TEXT)
    instructions: string;

    @AllowNull(true)
    @Column(DataType.TEXT)
    paragraph: string;

    @AllowNull(false)
    @Column(DataType.JSONB)
    answerOptions: IQuestion[];

}



@Table({
    tableName: "quiz_attempts",
    modelName: "QuizAttemptModel",
    underscored: true,
    freezeTableName: true
})
export class QuizAttemptModel extends Model<QuizAttemptModel> {
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string; 

    @ForeignKey(() => QuizModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    quizId: string;

    @BelongsTo(() => QuizModel)
    quiz: QuizModel;

    @ForeignKey(() => UsersModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string;

    @BelongsTo(() => UsersModel)
    user: UsersModel;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    attemptNumber: number;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    score: number;

    @AllowNull(false)
    @Column(DataType.JSONB)
    userAnswers: IUserAnswers[];
}
