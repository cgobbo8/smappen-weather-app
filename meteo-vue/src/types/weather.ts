import type { MainWeather, WeatherForecast, Wind } from '@/types/forecast'

export type Weather = {
  coord: {
    lon: number
    lat: number
  }
  weather: WeatherForecast[]
  base: string
  main: MainWeather
  visibility: number
  wind: Wind
  clouds: {
    all: number
  }
  dt: number
  sys: {
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}
