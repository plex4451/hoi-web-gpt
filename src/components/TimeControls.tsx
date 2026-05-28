import { useGameStore } from '../store/gameStore'

const SPEEDS = [
  { value: 0, label: 'Pause' },
  { value: 1, label: '1x' },
  { value: 2, label: '2x' },
  { value: 4, label: '4x' },
  { value: 8, label: '8x' },
]

export const TimeControls = () => {
  const speed = useGameStore((state) => state.speed)
  const setSpeed = useGameStore((state) => state.setSpeed)

  return (
    <div className="flex items-center gap-2">
      {SPEEDS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setSpeed(option.value)}
          className={`rounded px-3 py-1 text-sm font-medium transition ${
            speed === option.value
              ? 'bg-emerald-500 text-slate-950'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
