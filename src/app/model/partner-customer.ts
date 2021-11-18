import { Partner } from "./partner";

export interface PartnerCustomer {
    customerId?: number;
    customerNumber?: String;
    partnerId?: number;
    partner?: Array<Partner>;
}