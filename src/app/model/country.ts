import { City } from './city';
import { Bank } from './bank'; 
import { Wallet } from './wallet';

export interface Country {
    countryCode?: string;
    countryName?: string;
    countryLegacyCode?: string;
    countryImageUrl?: string;
    enabled?: any;
    cities?: Array<City>;
    banks?: Array<Bank>;
    wallets?: Array<Wallet>;
}