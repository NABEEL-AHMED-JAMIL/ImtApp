import { City } from './city';
import { Bank } from './bank';
import { Wallet } from './wallet';
import { Country } from './country';

export interface Partner {
    partnerId?: number;
    partnerName?: string;
    partnerImageUrl?: string;
    enabled?: any;
    preferenceOrder?: number;
    forexMarginShare?: number;
    partnerShare?: number;
    transferSpeed?: string;
    partnerCategory?: string;
    partnerTxtIdLabel?: string;
    country?: Country;
    countries?: Array<Country>;
    city?: City;
    cities?: Array<City>;
    bank?: Bank;
    banks?: Array<Bank>;
    wallet?: Wallet;
    wallets?: Array<Wallet>;
}