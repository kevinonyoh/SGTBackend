import { AllowNull, Column, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { IRole } from "../interfaces/admin.interface";

@Table({
    tableName: "admins",
    modelName: "AdminModel",
    underscored: true,
    freezeTableName: true
})
export class AdminModel extends Model<AdminModel> {
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(true)
    @Column
    fullName: string;

    @AllowNull(false)
    @Column
    phoneNumber: string;

    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column(DataType.ARRAY(DataType.ENUM(IRole.MANAGE_CONTENT, IRole.MANAGE_COURSES, IRole.SUPER_ADMIN)))
    role: IRole[];

    @AllowNull
    @Column
    password: string;

    @AllowNull
    @Default(true)
    @Column(DataType.BOOLEAN)
    isEmailVerified: boolean;
    
}