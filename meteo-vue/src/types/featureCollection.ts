// Type pour les coordonnées géographiques
export type Coordinates = [number, number]

// Type pour la géométrie de chaque feature
export type Geometry = {
  type: 'Point'
  coordinates: Coordinates
}

// Type pour les informations supplémentaires dans "addendum"
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

// Type pour les propriétés d'une feature
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

// Type pour chaque feature
export type Feature = {
  type: 'Feature'
  geometry: Geometry
  properties: Properties
  bbox?: [number, number, number, number]
}

// Type pour les informations de l'engin de géocodage
export type Engine = {
  name: string
  author: string
  version: string
}

// Type pour la langue utilisée dans la requête
export type Lang = {
  name: string
  iso6391: string
  iso6393: string
  via: string
  defaulted: boolean
}

// Type pour la requête du géocodage
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

// Type pour le geocoding
export type Geocoding = {
  version: string
  attribution: string
  query: Query
  warnings: string[]
  engine: Engine
  timestamp: number
}

// Type pour la collection de features
export type FeatureCollection = {
  type: string
  geocoding: Geocoding
  features: Feature[]
  bbox: [number, number, number, number]
}
