import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CoursesModel } from "./course.model";
import { ISection } from "../interfaces/courses.interface";


@Table({
    tableName: "courses_chapters",
    modelName: "ChapterModel",
    underscored: true,
    freezeTableName: true
})
export class ChapterModel extends Model<ChapterModel>{
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    chapterTitle: string;
    
    @AllowNull(true)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(true)
    @Default([])
    @Column(DataType.JSONB) 
    sections: ISection[];

    @AllowNull
    @Column
    additionalResources: string;

    @ForeignKey(() => CoursesModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    courseId: string;

    @BelongsTo(() => CoursesModel)
    course: CoursesModel;

}

