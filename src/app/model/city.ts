import { Country } from './country';

export interface City {
    cityId?: number;
    cityName?: string;
    enabled?: any;
    country?: Country;
}