import { create } from 'zustand'
import countriesData from '../data/countries.json'
import provincesData from '../data/provinces.json'
import unitsData from '../data/units.json'
import { advanceDate } from '../engine/time'
import type { Country, GameDate, Province, Unit } from '../types/game'

interface GameState {
  date: GameDate
  speed: number
  playerCountryId: string
  countries: Record<string, Country>
  provinces: Record<string, Province>
  units: Record<string, Unit>
  selectedProvinceId?: string
  selectedUnitId?: string
  setSpeed: (speed: number) => void
  advanceDay: () => void
  selectProvince: (provinceId?: string) => void
  selectUnit: (unitId?: string) => void
  moveSelectedUnit: (provinceId: string) => void
}

const mapById = <T extends { id: string }>(items: T[]) =>
  items.reduce<Record<string, T>>((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})

const initialCountries = mapById(countriesData as Country[])
const initialProvinces = mapById(provincesData as Province[])
const initialUnits = mapById(unitsData as Unit[])

export const useGameStore = create<GameState>((set, get) => ({
  date: { year: 1936, month: 1, day: 1 },
  speed: 1,
  playerCountryId: 'GER',
  countries: initialCountries,
  provinces: initialProvinces,
  units: initialUnits,
  selectedProvinceId: undefined,
  selectedUnitId: undefined,
  setSpeed: (speed) => set({ speed }),
  advanceDay: () => set((state) => ({ date: advanceDate(state.date) })),
  selectProvince: (provinceId) => set({ selectedProvinceId: provinceId }),
  selectUnit: (unitId) => {
    const unit = unitId ? get().units[unitId] : undefined
    set({
      selectedUnitId: unitId,
      selectedProvinceId: unit?.provinceId ?? get().selectedProvinceId,
    })
  },
  moveSelectedUnit: (provinceId) =>
    set((state) => {
      const unitId = state.selectedUnitId
      if (!unitId) return state
      const unit = state.units[unitId]
      const currentProvince = state.provinces[unit.provinceId]
      if (!currentProvince?.adjacent.includes(provinceId)) return state
      return {
        units: {
          ...state.units,
          [unitId]: { ...unit, provinceId },
        },
        selectedProvinceId: provinceId,
      }
    }),
}))
