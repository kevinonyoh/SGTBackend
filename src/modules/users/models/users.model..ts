import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { ICoursesInterest } from "../interfaces/users.interface";

@Table({
    tableName: "users",
    modelName: "UsersModel",
    underscored: true,
    freezeTableName: true
})
export class UsersModel extends Model<UsersModel> {
   
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    fullName: string;

    @AllowNull(true)
    @Column
    phoneNumber: string;

    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @AllowNull(true)
    @Column(DataType.ARRAY(DataType.ENUM(ICoursesInterest.ATS, ICoursesInterest.ICAN, ICoursesInterest.Olevel, ICoursesInterest.All_Courses)))
    coursesInterest: ICoursesInterest[];

    @AllowNull(true)
    @Column
    password: string;

    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    isEmailVerified: boolean;


}