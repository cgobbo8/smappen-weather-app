type InterpolationParams = {
  value: number
  minInput: number
  maxInput: number
  minOutput: number
  maxOutput: number
}

export function interpolate({
  value,
  minInput,
  maxInput,
  minOutput,
  maxOutput
}: InterpolationParams) {
  if (value < minInput || value > maxInput) {
    throw new Error('Value out of interval')
  }

  return minOutput + ((value - minInput) * (maxOutput - minOutput)) / (maxInput - minInput)
}

export function interpolateCircularInverse({
  value,
  minInput,
  maxInput,
  minOutput,
  maxOutput
}: InterpolationParams) {
  const inputRange = maxInput - minInput
  const outputRange = maxOutput - minOutput

  let normalizedValue = (((value - minInput) % inputRange) + inputRange) % inputRange
  return minOutput + (1 - normalizedValue / inputRange) * outputRange
}

export enum WEATHER_TYPE {
  CLEAR = 'CLEAR',
  CLOUDY = 'CLOUDY',
  RAINY = 'RAINY',
  THUNDER = 'THUNDER'
}

export function getWeatherType(weatherIcon?: string): WEATHER_TYPE {
  if (!weatherIcon) return WEATHER_TYPE.CLOUDY

  const number = weatherIcon.slice(0, 2)

  switch (number) {
    case '01':
      return WEATHER_TYPE.CLEAR
    case '02':
    case '03':
    case '04':
      return WEATHER_TYPE.CLOUDY
    case '09':
    case '10':
      return WEATHER_TYPE.RAINY
    case '11':
      return WEATHER_TYPE.THUNDER
    default:
      return WEATHER_TYPE.CLOUDY
  }
}
