import { useMemo } from 'react'
import { useGameStore } from '../store/gameStore'

export const UnitPanel = () => {
  const playerCountryId = useGameStore((state) => state.playerCountryId)
  const units = useGameStore((state) => state.units)
  const provinces = useGameStore((state) => state.provinces)
  const selectedUnitId = useGameStore((state) => state.selectedUnitId)
  const selectUnit = useGameStore((state) => state.selectUnit)

  const playerUnits = useMemo(
    () => Object.values(units).filter((unit) => unit.countryId === playerCountryId),
    [playerCountryId, units]
  )

  return (
    <section className="border-t border-panelBorder bg-panel px-4 py-3">
      <h2 className="mb-2 text-sm font-semibold text-slate-100">Army Overview</h2>
      <div className="flex flex-wrap gap-2">
        {playerUnits.map((unit) => (
          <button
            key={unit.id}
            type="button"
            onClick={() => selectUnit(unit.id)}
            className={`rounded border px-3 py-2 text-xs transition ${
              selectedUnitId === unit.id
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                : 'border-panelBorder bg-panelHighlight text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="font-semibold text-slate-100">{unit.name}</div>
            <div className="text-slate-400">
              {unit.type} · {provinces[unit.provinceId]?.name ?? 'Unknown'}
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
