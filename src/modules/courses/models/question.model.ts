import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { QuizModel } from "./quiz.model";
import { UsersModel } from "src/modules/users/models/users.model.";
import { IQuestion } from "../interfaces/courses.interface";



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

    @AllowNull(false)
    @Column(DataType.FLOAT)
    content: number;


}
