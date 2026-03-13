import env from "#start/env";
import { IGateway, PaymentData, PaymentResponse } from "./gateway.interface.ts";

export default class Gateway1Service implements IGateway {

    async authenticate(): Promise<any> {
        const respAuth = await fetch('http://gateways:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: env.get('GATEWAY1_EMAIL'),
                token: env.get('GATEWAY1_TOKEN')
            })
        });

        return respAuth.json();
    }

    async pay(data: PaymentData): Promise<PaymentResponse> {
    
        const resAuth = await this.authenticate();

        if(!resAuth || !resAuth?.token) {
            throw new Error('Authentication failed');
        }

        const respPayment = await fetch('http://gateways:3001/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resAuth.token}`
            },
            body: JSON.stringify({
                amount: data.amount,
                name: data.name,
                email: data.email,
                cardNumber: data.cardNumber,
                cvv: data.cvv
            })
        });

        return (await respPayment.json()) as PaymentResponse;

    }

    async chargeBack(externalId: string): Promise<boolean> {
        const resAuth = await this.authenticate();

        if(!resAuth || !resAuth?.token) {
            throw new Error('Authentication failed');
        }

        const respChargeBack = await fetch(`http://gateways:3001/transactions/${externalId}/chargeback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resAuth.token}`
            }
        });

        if(!respChargeBack.ok) {
            return false;
        }

        return true;
    }
}