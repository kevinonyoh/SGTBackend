import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { UsersModel } from "../models/users.model.";

@Injectable()
export class UsersRepository extends ModelRepository<UsersModel> {
    constructor() {
        super(UsersModel);
    }
}