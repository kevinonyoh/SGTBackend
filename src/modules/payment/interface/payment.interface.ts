export interface IPayment{
    tx_ref: string,
    amount: string,
    currency: string,
    redirect_url: string,
    customer: {
        email: string,
        name: string,
        phonenumber: string
    }
}


export enum IStatus{
    successful = "successful",
    failed = "failed",
    pending = "pending"
}