import { Table, Column, Model, DataType, ForeignKey, Default, PrimaryKey } from 'sequelize-typescript';
import { CoursesModel } from './course.model';
import { UsersModel } from 'src/modules/users/models/users.model.';


@Table({ 
  tableName: 'course_ratings',
  modelName: "CourseRatingModel",
  freezeTableName: true
 })
export class CourseRatingModel extends Model<CourseRatingModel> {
 
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;
  
  @ForeignKey(() => CoursesModel)
  @Column(DataType.UUID)
  courseId: number;

  @ForeignKey(() => UsersModel)
  @Column(DataType.UUID)
  userId: number;

  @Column(DataType.INTEGER)
  rating: number;
}
