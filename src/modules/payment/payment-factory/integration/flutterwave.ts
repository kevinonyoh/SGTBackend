import { ConfigService } from "@nestjs/config";
import { IPayment } from "../../interface/payment.interface";

class Flutterwave{
    constructor(private readonly configService: ConfigService){}

    private readonly baseUrl = process.env.FLUTTERWAVE_BASE_URL;

    private readonly secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    private readonly redirectUrl = process.env.FLUTTERWAVE_REDIRECT_URL;


    private readonly config = {

        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
        }

    };

    readonly endpoints = {
        initiatePayment: (data: IPayment) => ({
            ...this.config,
            url: `${this.baseUrl}/payments`,
            method: 'POST',
            data: {
                ...data,
                currency: 'NGN',
                redirect_url: `${this.redirectUrl}/api/v1/payment/success`,
            }
        }),

        verifyPayment: (reference: string) => ({
            ...this.config,
            url: `${this.baseUrl}/transactions/verify_by_reference?tx_ref=${reference}`,
            method: 'GET'
        })
    }

}


export const flutterwave = new Flutterwave(new ConfigService);