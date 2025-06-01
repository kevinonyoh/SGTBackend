import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { ChapterModel } from "../models/chapter.model";


@Injectable()
export class ChapterRepository extends ModelRepository<ChapterModel> {
    constructor() {
        super(ChapterModel);
    }
}