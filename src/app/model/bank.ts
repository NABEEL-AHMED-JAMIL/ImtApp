import { Country } from "./country";

export interface Bank {
    bankId?: number;
    bankName?: string;
    bankImageUrl?: string;
    enabled?: any;
    country?: Country;
}