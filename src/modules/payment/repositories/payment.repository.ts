import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { PaymentModel } from "../model/payment.model";

@Injectable()
export class PaymentRepository extends ModelRepository<PaymentModel> {
    constructor() {
        super(PaymentModel);
    }
}