import { GatewayEnum } from "../../enums/gateway.enum.ts";
import { GatewayRegistry } from "../../registries/gateway.registry.ts";
import { PaymentData } from "./gateway.interface.ts";

export class GatewayService {
    static async processPayment(gatewayName: string, data: PaymentData) {
        const gateway = GatewayRegistry[gatewayName as GatewayEnum]

        if(!gateway) {
            throw new Error('Selected Gateway not found.');
        }

        const paymentResponse = await gateway.pay(data);

        return paymentResponse;
    }

    static async processChargeBack(gatewayName: string, externalId: string) {
        const gateway = GatewayRegistry[gatewayName as GatewayEnum]

        if(!gateway) {
            throw new Error('Selected Gateway not found.');
        }

        const chargeBackResponse = await gateway.chargeBack(externalId);

        return chargeBackResponse;
    }
}