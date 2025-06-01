import { BadGatewayException, Injectable } from "@nestjs/common";
import { HttpRequestService } from "src/shared/http-request/http.request.service";
import { flutterwave } from "../integration/flutterwave";
import { IPayment } from "../../interface/payment.interface";

@Injectable()
export class FlutterwaveGateway{
    constructor(private readonly httpRequestService: HttpRequestService){

    }

    async initiatePayment(payload) {
        try {
            
            const resp= await this.httpRequestService.send(flutterwave.endpoints.initiatePayment(payload));
            
            return resp;

        } catch (error) {
            throw new BadGatewayException(error.message);
        }
    }

    async verifyPayment(reference: string){
        try{
     
            const resp = await this.httpRequestService.send(flutterwave.endpoints.verifyPayment(reference));

            return resp.data;

        } catch(error){
            throw new BadGatewayException(error.message);
        }
    }

}

