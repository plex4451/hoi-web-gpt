import { formatDate } from '../engine/time'
import { useGameStore } from '../store/gameStore'
import { TimeControls } from './TimeControls'

const RESOURCE_LABELS: Record<string, string> = {
  steel: 'Steel',
  oil: 'Oil',
  aluminum: 'Alu',
  tungsten: 'W',
  rubber: 'Rub',
  chromium: 'Cr',
}

export const TopBar = () => {
  const date = useGameStore((state) => state.date)
  const playerCountryId = useGameStore((state) => state.playerCountryId)
  const country = useGameStore((state) => state.countries[playerCountryId])

  return (
    <header className="flex items-center justify-between border-b border-panelBorder bg-panel px-4 py-3">
      <div>
        <p className="text-sm text-slate-400">{formatDate(date)}</p>
        <h1 className="text-lg font-semibold text-slate-100">{country?.name}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {country &&
            Object.entries(country.resources).map(([key, value]) => (
              <div
                key={key}
                className="rounded border border-panelBorder bg-panelHighlight px-2 py-1 text-xs text-slate-200"
              >
                {RESOURCE_LABELS[key] ?? key}: {value}
              </div>
            ))}
        </div>
        <TimeControls />
      </div>
    </header>
  )
}
