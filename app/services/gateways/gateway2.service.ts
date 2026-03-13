import env from "#start/env";
import { IGateway, PaymentData, PaymentResponse } from "./gateway.interface.ts";

export default class Gateway2Service implements IGateway {
    async pay(data: PaymentData): Promise<PaymentResponse> {
        const respPayment = await fetch('http://gateways:3002/transacoes', {
            method: 'POST',
            body: JSON.stringify({
                valor: data.amount,
                nome: data.name,
                email: data.email,
                numeroCartao: data.cardNumber,
                cvv: data.cvv,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Gateway-Auth-Token': env.get('GATEWAY2_TOKEN'),
                'Gateway-Auth-Secret': env.get('GATEWAY2_SECRET'),
            },
        });

        
        return (await respPayment.json()) as PaymentResponse;
    }

    async chargeBack(externalId: string): Promise<boolean> {
        const respChargeBack = await fetch(`http://gateways:3002/transacoes/reembolso`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Gateway-Auth-Token': env.get('GATEWAY2_TOKEN'),
                'Gateway-Auth-Secret': env.get('GATEWAY2_SECRET'),
            },
            body: JSON.stringify({
                id: externalId
            })
        });

        if(!respChargeBack.ok) {
            return false;
        }

        return true;
    }
}