import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCities, getCountryByLatLon, getWeather } from '@/services/cityServices'
import type { City, CityWeather } from '@/types'
import { TOULOUSE_LAT_LNG } from '@/libs/constants'
import type { WeatherData } from '@/types/forecast'

type ForecastUi = { day: string; date: string; minTemp: number; maxTemp: number; icons: string[] }
type ForecastUiWithIcon = ForecastUi & {
  mostFrequentIcon: string
  minTempHue: number
  maxTempHue: number
  minTempHslClass: string
  maxTempHslClass: string
}

const getDayShort = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
const getMostUsedIcon = (icons: string[]) =>
  Array.from(new Set(icons)).reduce((prev, curr) =>
    icons.filter((el) => el === curr).length > icons.filter((el) => el === prev).length
      ? curr
      : prev
  )
const computeHueWithTemperature = (temp: number) => {
  const maxTemp = 35
  const minTemp = 0
  const maxRange = 0
  const minRange = 250

  if (temp < minTemp) return minRange
  if (temp > maxTemp) return maxRange

  return ((temp - minTemp) * (maxRange - minRange)) / (maxTemp - minTemp) + minRange
}
function getTimeWithTimezone(offsetInSeconds: number) {
  const newOffset = offsetInSeconds - 7200 // 2 hours
  const nowUTC = new Date().getTime()
  const localTime = new Date(nowUTC + newOffset * 1000)
  return new Date(localTime.toUTCString())
}

export const useCityStore = defineStore('city', () => {
  const loadedCities = ref<City[]>([])
  const selectedCity = ref<CityWeather | null>(null)
  const forecastNextHours = ref<WeatherData[]>([])
  const forecastNextDays = ref<ForecastUiWithIcon[]>([])
  const currentTime = ref<Date | null>(null)
  const isFirstPlaceLoaded = ref<boolean>(false)

  const dispatchLoadCities = async (query: string) => {
    loadedCities.value = await getCities(query)
  }

  const currentLatLon = ref<{ lat: number; lon: number } | null>(null)

  const dispatchSelectCity = async (city: City) => {
    const { currentWeather, forecastWeather } = await getWeather(city)

    console.log(city)
    selectedCity.value = {
      city: city,
      weather: currentWeather
    }

    currentTime.value = getTimeWithTimezone(currentWeather.timezone)

    const forecastDaysWithIconList = forecastWeather.list.reduce((prev, curr) => {
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
    }, [] as ForecastUi[])

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

  const dispatchLatLonChange = async (latlon: { lat: number; lon: number }) => {
    const response = await getCountryByLatLon(latlon)

    const test = {
      ...response[0],
      label: response[0].name,
      locality: response[0].name
    }

    await dispatchSelectCity(test)
  }

  const cleanCities = () => {
    loadedCities.value = []
  }

  dispatchLatLonChange(TOULOUSE_LAT_LNG).then(() => {
    isFirstPlaceLoaded.value = true
  })

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
