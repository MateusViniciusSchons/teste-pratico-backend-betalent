export interface IGateway {
    pay(data: PaymentData): Promise<PaymentResponse>
    chargeBack(externalId: string): Promise<boolean>
}

export interface PaymentData {
    amount: number
    name: string
    email: string
    cardNumber: string
    cvv: string
}

export interface PaymentResponse {
    id: string
}