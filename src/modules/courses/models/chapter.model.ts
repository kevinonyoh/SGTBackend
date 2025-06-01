import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CoursesModel } from "./course.model";


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
    
    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string;

    @AllowNull(false)
    @Column
    publicId: string;

    @AllowNull(false)
    @Column
    url: string;

    @AllowNull(false)
    @Column
    format: string;

    @AllowNull(false)
    @Default("video")
    @Column
    resourceType: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    duration: number;

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

