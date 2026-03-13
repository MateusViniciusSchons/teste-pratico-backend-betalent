import { IGateway } from "#services/gateways/gateway.interface";
import Gateway1Service from "#services/gateways/gateway1.service";
import Gateway2Service from "#services/gateways/gateway2.service";
import { GatewayEnum } from "../enums/gateway.enum.ts";

export const GatewayRegistry: Record<GatewayEnum, IGateway> = {
    [GatewayEnum.GATEWAY1]: new Gateway1Service(),
    [GatewayEnum.GATEWAY2]: new Gateway2Service(),
}