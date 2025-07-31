import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { CourseRatingModel } from "../models/course-rating.model";


@Injectable()
export class CourseRatingRepository extends ModelRepository<CourseRatingModel> {
    constructor() {
        super(CourseRatingModel);
    }
}