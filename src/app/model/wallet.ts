import { Country } from './country';

export interface Wallet {
    walletId?: number;
    walletName?: string;
    walletImageUrl?: string;
    enabled?: any;
    country?: Country;
}