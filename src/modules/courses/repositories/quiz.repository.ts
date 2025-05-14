import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { QuizModel } from "../models/quiz.model";



@Injectable()
export class QuizRepository extends ModelRepository<QuizModel> {
    constructor() {
        super(QuizModel);
    }
}