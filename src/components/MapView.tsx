import { useMemo } from 'react'
import { useGameStore } from '../store/gameStore'

export const MapView = () => {
  const provinces = useGameStore((state) => state.provinces)
  const countries = useGameStore((state) => state.countries)
  const units = useGameStore((state) => state.units)
  const selectedProvinceId = useGameStore((state) => state.selectedProvinceId)
  const selectedUnitId = useGameStore((state) => state.selectedUnitId)
  const selectProvince = useGameStore((state) => state.selectProvince)
  const selectUnit = useGameStore((state) => state.selectUnit)
  const moveSelectedUnit = useGameStore((state) => state.moveSelectedUnit)

  const provinceList = useMemo(() => Object.values(provinces), [provinces])
  const unitList = useMemo(() => Object.values(units), [units])

  const handleProvinceClick = (provinceId: string) => {
    if (selectedUnitId) {
      moveSelectedUnit(provinceId)
    }
    selectProvince(provinceId)
  }

  return (
    <div className="h-full w-full rounded border border-panelBorder bg-slate-950 p-3">
      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span>Europe Theater Map</span>
        <span>Click a province or move selected units to adjacent provinces.</span>
      </div>
      <svg
        viewBox="0 0 1000 600"
        className="h-full w-full"
        role="img"
        aria-label="Europe map"
      >
        <rect width="1000" height="600" fill="#0f172a" />
        {provinceList.map((province) => {
          const owner = countries[province.controllerId]
          const isSelected = selectedProvinceId === province.id

          return (
            <path
              key={province.id}
              d={province.path}
              fill={owner?.color ?? '#334155'}
              stroke={isSelected ? '#facc15' : '#1f2937'}
              strokeWidth={isSelected ? 3 : 2}
              onClick={() => handleProvinceClick(province.id)}
              className="cursor-pointer transition hover:opacity-90"
            />
          )
        })}
        {unitList.map((unit) => {
          const province = provinces[unit.provinceId]
          if (!province) return null
          const isSelected = unit.id === selectedUnitId

          return (
            <g key={unit.id}>
              <circle
                cx={province.centroid.x}
                cy={province.centroid.y}
                r={isSelected ? 10 : 7}
                fill="#e2e8f0"
                stroke={isSelected ? '#38bdf8' : '#0f172a'}
                strokeWidth={2}
                onClick={(event) => {
                  event.stopPropagation()
                  selectUnit(unit.id)
                }}
                className="cursor-pointer"
              />
              <text
                x={province.centroid.x}
                y={province.centroid.y + 18}
                textAnchor="middle"
                fontSize="10"
                fill="#94a3b8"
              >
                {unit.type}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
