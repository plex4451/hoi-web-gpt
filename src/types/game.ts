export type Ideology = 'Democratic' | 'Fascist' | 'Communist' | 'Monarchist' | 'Neutral'

export type Terrain =
  | 'Plains'
  | 'Forest'
  | 'Hills'
  | 'Mountains'
  | 'Urban'
  | 'Desert'
  | 'Marsh'
  | 'Arctic'

export type ResourceKey = 'steel' | 'oil' | 'aluminum' | 'tungsten' | 'rubber' | 'chromium'

export type ResourceMap = Record<ResourceKey, number>

export interface Country {
  id: string
  name: string
  color: string
  ideology: Ideology
  stability: number
  warSupport: number
  population: number
  manpower: number
  factories: number
  researchSlots: number
  politicalPower: number
  resources: ResourceMap
}

export interface Province {
  id: string
  name: string
  ownerId: string
  controllerId: string
  terrain: Terrain
  population: number
  supply: number
  infrastructure: number
  factories: number
  victoryPoints: number
  resources: ResourceMap
  adjacent: string[]
  centroid: {
    x: number
    y: number
  }
  path: string
}

export interface Unit {
  id: string
  name: string
  countryId: string
  type: string
  provinceId: string
  strength: number
  organization: number
  speed: number
}

export interface GameDate {
  year: number
  month: number
  day: number
}
