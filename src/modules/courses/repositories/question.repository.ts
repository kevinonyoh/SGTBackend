import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { QuestionModel } from "../models/question.model";



@Injectable()
export class QuestionRepository extends ModelRepository<QuestionModel> {
    constructor() {
        super(QuestionModel);
    }
}