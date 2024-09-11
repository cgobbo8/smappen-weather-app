import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCities, getCountryByLatLon, getWeather } from '@/services/cityServices'
import type { City, CityWeather } from '@/types'
import { TOULOUSE_LAT_LNG } from '@/libs/constants'
import type { ForecastUi, ForecastUiWithIcon, WeatherData } from '@/types/forecast'
import {
  computeHueWithTemperature,
  getDayShort,
  getMostUsedIcon,
  getTimeWithTimezone
} from '@/utils'

const forecastDaysWithIconListReducerCb = (prev: ForecastUi[], curr: WeatherData): ForecastUi[] => {
  const correspondingItemByDay = prev.find(
    (forecast) => getDayShort(forecast.date) === getDayShort(curr.dt_txt)
  )

  if (!correspondingItemByDay) {
    return [
      ...prev,
      {
        day: getDayShort(curr.dt_txt),
        date: curr.dt_txt,
        minTemp: curr.main.temp_min,
        maxTemp: curr.main.temp_max,
        icons: curr.weather?.[0]?.icon ? [curr.weather?.[0]?.icon] : []
      }
    ]
  }

  const updatedCorrespondingItem = {
    ...correspondingItemByDay,
    minTemp: Math.min(correspondingItemByDay.minTemp, curr.main.temp_min),
    maxTemp: Math.max(correspondingItemByDay.maxTemp, curr.main.temp_max),
    icons: curr.weather?.[0]?.icon
      ? [...correspondingItemByDay.icons, curr.weather?.[0]?.icon]
      : [...correspondingItemByDay.icons]
  }

  Object.assign(correspondingItemByDay, updatedCorrespondingItem)

  return [...prev]
}

export const useCityStore = defineStore('city', () => {
  const loadedCities = ref<City[]>([])
  const selectedCity = ref<CityWeather | null>(null)
  const forecastNextHours = ref<WeatherData[]>([])
  const forecastNextDays = ref<ForecastUiWithIcon[]>([])
  const currentTime = ref<Date | null>(null)
  const currentLatLon = ref<{ lat: number; lon: number } | null>(null)
  const isFirstPlaceLoaded = ref<boolean>(false)

  const cleanCities = () => {
    loadedCities.value = []
  }

  dispatchLatLonChange(TOULOUSE_LAT_LNG).then(() => {
    isFirstPlaceLoaded.value = true
  })

  async function dispatchLoadCities(query: string) {
    loadedCities.value = await getCities(query)
  }

  async function dispatchSelectCity(city: City) {
    const { currentWeather, forecastWeather } = await getWeather(city)

    selectedCity.value = {
      city: city,
      weather: currentWeather
    }

    currentTime.value = getTimeWithTimezone(currentWeather.timezone)

    const forecastDaysWithIconList = forecastWeather.list.reduce(
      forecastDaysWithIconListReducerCb,
      [] as ForecastUi[]
    )

    const forecastDaysWithMostUsedIcon = forecastDaysWithIconList.map((forecast) => {
      return {
        ...forecast,
        mostFrequentIcon: getMostUsedIcon(forecast.icons),
        minTempHue: computeHueWithTemperature(forecast.minTemp),
        maxTempHue: computeHueWithTemperature(forecast.maxTemp),
        minTempHslClass: `from-[hsl(${Math.floor(computeHueWithTemperature(forecast.minTemp))},77%,62%)]`,
        maxTempHslClass: `to-[hsl(${Math.floor(computeHueWithTemperature(forecast.maxTemp))},77%,62%)]`
      }
    }) as ForecastUiWithIcon[]

    forecastNextHours.value = [...forecastWeather.list].slice(0, 20)
    forecastNextDays.value = [...forecastDaysWithMostUsedIcon]

    currentLatLon.value = {
      lat: city.lat,
      lon: city.lon
    }
  }

  async function dispatchLatLonChange(latlon: { lat: number; lon: number }) {
    const response = await getCountryByLatLon(latlon)

    const test = {
      ...response[0],
      label: response[0].name,
      locality: response[0].name
    }

    await dispatchSelectCity(test)
  }

  return {
    selectedCity,
    loadedCities,
    currentTime,
    isFirstPlaceLoaded,
    forecastNextHours,
    forecastNextDays,
    currentLatLon,
    cleanCities,
    dispatchLatLonChange,
    dispatchSelectCity,
    dispatchLoadCities
  }
})
