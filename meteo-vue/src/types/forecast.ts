export type WeatherResponse = {
  cod: string
  message: number
  cnt: number
  list: WeatherData[]
  city: CityForecast
}

export type WeatherData = {
  dt: number
  main: MainWeather
  weather: WeatherForecast[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  rain?: Rain
  sys: Sys
  dt_txt: string
}

export type MainWeather = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export type WeatherForecast = {
  id: number
  main: string
  description: string
  icon: string
}

export type Clouds = {
  all: number
}

export type Wind = {
  speed: number
  deg: number
  gust: number
}

export type Rain = {
  '3h': number
}

export type Sys = {
  pod: string
}

export type CityForecast = {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export type Coord = {
  lat: number
  lon: number
}

export type ForecastUi = {
  day: string
  date: string
  minTemp: number
  maxTemp: number
  icons: string[]
}
export type ForecastUiWithIcon = ForecastUi & {
  mostFrequentIcon: string
  minTempHue: number
  maxTempHue: number
  minTempHslClass: string
  maxTempHslClass: string
}
