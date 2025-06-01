import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { CoursesModel } from "../models/course.model";

@Injectable()
export class CoursesRepository extends ModelRepository<CoursesModel> {
    constructor() {
        super(CoursesModel);
    }
}