import { ModelRepository } from "src/shared/database/repository/model.repository";
import { AdminModel } from "../models/admin.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminRepository extends ModelRepository<AdminModel> {
    constructor() {
        super(AdminModel);
    }
}