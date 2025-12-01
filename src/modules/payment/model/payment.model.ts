import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { CoursesModel } from "src/modules/courses/models/course.model";
import { UsersModel } from "src/modules/users/models/users.model.";
import { IStatus } from "../interface/payment.interface";

@Table({
    tableName: "payment",
    modelName: "PaymentModel",
    underscored: true,
    freezeTableName: true
})
export class PaymentModel extends Model<PaymentModel>{
   
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @ForeignKey(() => UsersModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId: string;

    @ForeignKey(() => CoursesModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    courseId: string;

    @AllowNull
    @Default(IStatus.pending)
    @Column(DataType.ENUM(IStatus.failed, IStatus.pending, IStatus.successful))
    status: string;

    @AllowNull(false)
    @Column
    tx_ref: string;

    @AllowNull(true)
    @Column(DataType.DATE)
    expirationDate: Date;

    @BelongsTo(() => CoursesModel)
    course: CoursesModel;
    
    @BelongsTo(() => UsersModel)
    user: UsersModel;  
}