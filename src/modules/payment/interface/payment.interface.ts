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
    success = "successful",
    failed = "failed",
    pending = "pending"
}