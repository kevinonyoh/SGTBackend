import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { ContentModel } from "../models/content.model";


@Injectable()
export class ContentRepository extends ModelRepository<ContentModel> {
    constructor() {
        super(ContentModel);
    }
}