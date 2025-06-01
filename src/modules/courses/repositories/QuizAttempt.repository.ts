import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { QuizAttemptModel } from "../models/question.model";



@Injectable()
export class QuizAttemptRepository extends ModelRepository<QuizAttemptModel> {
    constructor() {
        super(QuizAttemptModel);
    }
}