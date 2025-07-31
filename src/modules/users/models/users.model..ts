import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { ICoursesInterest } from "../interfaces/users.interface";
import { PaymentModel } from "src/modules/payment/model/payment.model";

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

    @AllowNull(false)
    @Default(true)
    @Column(DataType.BOOLEAN)
    activated: boolean;

    @AllowNull(true)
    @Column
    password: string;

    @AllowNull(true)
    @Column(DataType.BOOLEAN)
    isEmailVerified: boolean;

    @HasMany(() => PaymentModel)
    payments: PaymentModel[];

}