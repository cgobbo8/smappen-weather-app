import type { City } from '@/types/city'
import type { FeatureCollection } from '@/types/featureCollection'
import type { Weather } from '@/types/weather'
import type { WeatherResponse } from '@/types/forecast'

export async function getCities(query: string): Promise<City[]> {
  const featureCollection = await fetch(
    `http://pelias.smappen.com:4000/v1/autocomplete?size=10&text=${query}`
  ).then((res) => res.json() as Promise<FeatureCollection>)
  return featureCollection.features.map((feature) => ({
    name: feature.properties.name,
    lat: feature.geometry.coordinates[1],
    lon: feature.geometry.coordinates[0],
    country: feature.properties.country,
    locality: feature.properties.locality,
    address: feature.properties.street
      ? `${feature.properties.housenumber ? `${feature.properties.housenumber} ` : ''}${feature.properties.street}`
      : null,
    label: feature.properties.label
  })) as City[]
}

export async function getWeather(
  city: City
): Promise<{ currentWeather: Weather; forecastWeather: WeatherResponse }> {
  const [currentWeather, forecastWeather] = await Promise.all([
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
    ).then((res) => res.json() as Promise<Weather>),
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`
    ).then((res) => res.json() as Promise<WeatherResponse>)
  ])

  return { currentWeather, forecastWeather }
}

export async function getCountryByLatLon({
  lat,
  lon
}: {
  lat: number
  lon: number
}): Promise<[City]> {
  return await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
  ).then((res) => res.json())
}
