export type Coordinates = [number, number]

export type Geometry = {
  type: 'Point'
  coordinates: Coordinates
}

export type Addendum = {
  geonames?: {
    feature_code: string
  }
  osm?: {
    wheelchair?: string
    wikidata?: string
    wikipedia?: string
    website?: string
    phone?: string
    opening_hours?: string
    iata?: string
    icao?: string
  }
}

export type Properties = {
  id: string
  gid: string
  layer: string
  source: string
  source_id: string
  country_code: string
  name: string
  accuracy: string
  country: string
  housenumber: string
  country_gid: string
  country_a: string
  macroregion?: string
  macroregion_gid?: string
  macroregion_a?: string
  region?: string
  region_gid?: string
  region_a?: string
  macrocounty?: string
  macrocounty_gid?: string
  county?: string
  county_gid?: string
  county_a?: string
  localadmin?: string
  localadmin_gid?: string
  locality?: string
  locality_gid?: string
  continent: string
  street?: string
  continent_gid: string
  label: string
  addendum?: Addendum
}

export type Feature = {
  type: 'Feature'
  geometry: Geometry
  properties: Properties
  bbox?: [number, number, number, number]
}

export type Engine = {
  name: string
  author: string
  version: string
}

export type Lang = {
  name: string
  iso6391: string
  iso6393: string
  via: string
  defaulted: boolean
}

export type Query = {
  text: string
  parser: string
  parsed_text: {
    subject: string
  }
  size: number
  layers: string[]
  private: boolean
  lang: Lang
  querySize: number
}

export type Geocoding = {
  version: string
  attribution: string
  query: Query
  warnings: string[]
  engine: Engine
  timestamp: number
}

export type FeatureCollection = {
  type: string
  geocoding: Geocoding
  features: Feature[]
  bbox: [number, number, number, number]
}
