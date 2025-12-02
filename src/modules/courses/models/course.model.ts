import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ICoursesInterest } from "src/modules/users/interfaces/users.interface";
import { ICoursesLevel } from "../interfaces/courses.interface";
import { ChapterModel } from "./chapter.model";
import { QuizModel } from "./quiz.model";
import { CourseRatingModel } from "./course-rating.model";


@Table({
    tableName: "courses",
    modelName: "CoursesModel",
    underscored: true,
    freezeTableName: true
})
export class CoursesModel extends Model<CoursesModel>{
  
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    title: string;
    
    @AllowNull(false)
    @Column
    imageUrl: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    price: number;

    @AllowNull(false)
    @Column(DataType.ENUM(ICoursesInterest.ATS, ICoursesInterest.ICAN, ICoursesInterest.Olevel))
    courseType: ICoursesInterest;

    @AllowNull(true)
    @Column
    explanatoryVideoUrl: string;

    @AllowNull(true)
    @Column
    description: string;

    @AllowNull(true)
    @Column(DataType.INTEGER) 
    durationMonths: number;

    @HasMany(() => ChapterModel, { as: 'chapters', foreignKey: 'courseId' })
    chapters: ChapterModel[];

    @HasMany(() => QuizModel, { as: 'quizzes', foreignKey: 'courseId' })
    quizzes: QuizModel[];

    @HasMany(() => CourseRatingModel)
    ratings: CourseRatingModel[];

}



