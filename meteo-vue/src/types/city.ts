import type {Weather} from "@/types/weather";

export type City = {
    id?: number;
    name: string;
    lat: number;
    lon: number;
    country: string;
    address?: string;
    locality?: string;
    label?:string;
}

export type CityWeather = {
    city: City;
    weather: Weather;
}
