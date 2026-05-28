import { useMemo } from 'react'
import { useGameStore } from '../store/gameStore'

const formatPercent = (value: number) => `${Math.round(value * 100)}%`

export const SidePanel = () => {
  const playerCountryId = useGameStore((state) => state.playerCountryId)
  const countries = useGameStore((state) => state.countries)
  const provinces = useGameStore((state) => state.provinces)
  const selectedProvinceId = useGameStore((state) => state.selectedProvinceId)

  const country = countries[playerCountryId]
  const selectedProvince = selectedProvinceId ? provinces[selectedProvinceId] : undefined
  const selectedOwner = selectedProvince ? countries[selectedProvince.ownerId] : undefined

  const provinceStats = useMemo(() => {
    if (!selectedProvince) return []
    return [
      { label: 'Terrain', value: selectedProvince.terrain },
      { label: 'Population', value: selectedProvince.population.toLocaleString() },
      { label: 'Supply', value: selectedProvince.supply },
      { label: 'Infrastructure', value: selectedProvince.infrastructure },
      { label: 'Factories', value: selectedProvince.factories },
      { label: 'Victory Points', value: selectedProvince.victoryPoints },
    ]
  }, [selectedProvince])

  return (
    <aside className="flex w-72 flex-col gap-6 border-r border-panelBorder bg-panel px-4 py-5 text-sm text-slate-200">
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-100">Country Overview</h2>
        {country && (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Ideology</span>
              <span className="font-semibold text-slate-100">{country.ideology}</span>
            </div>
            <div className="flex justify-between">
              <span>Stability</span>
              <span>{formatPercent(country.stability)}</span>
            </div>
            <div className="flex justify-between">
              <span>War Support</span>
              <span>{formatPercent(country.warSupport)}</span>
            </div>
            <div className="flex justify-between">
              <span>Manpower</span>
              <span>{country.manpower.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Factories</span>
              <span>{country.factories}</span>
            </div>
            <div className="flex justify-between">
              <span>Research Slots</span>
              <span>{country.researchSlots}</span>
            </div>
          </div>
        )}
      </section>
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-slate-100">Province Intel</h2>
        {selectedProvince ? (
          <div className="space-y-3 text-xs">
            <div>
              <p className="text-sm font-semibold text-slate-100">{selectedProvince.name}</p>
              <p className="text-slate-400">Owner: {selectedOwner?.name ?? 'Unknown'}</p>
            </div>
            <div className="space-y-2">
              {provinceStats.map((stat) => (
                <div key={stat.label} className="flex justify-between">
                  <span className="text-slate-400">{stat.label}</span>
                  <span>{stat.value}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-slate-400">Adjacent Provinces</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedProvince.adjacent.map((adjacentId) => (
                  <span
                    key={adjacentId}
                    className="rounded border border-panelBorder bg-panelHighlight px-2 py-1"
                  >
                    {provinces[adjacentId]?.name ?? adjacentId}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">Select a province to view details.</p>
        )}
      </section>
    </aside>
  )
}
