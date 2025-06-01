import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ICoursesInterest } from "src/modules/users/interfaces/users.interface";



@Table({
    tableName: "contents",
    modelName: "ContentModel",
    underscored: true,
    freezeTableName: true
})
export class ContentModel extends Model<ContentModel> {
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    slug: string;

    @AllowNull(false)
    @Column
    image: string;

    @AllowNull(false)
    @Column(DataType.ENUM(ICoursesInterest.ATS, ICoursesInterest.ICAN, ICoursesInterest.Olevel))
    categories: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    content: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    date: Date;

}