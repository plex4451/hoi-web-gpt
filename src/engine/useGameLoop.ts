import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'

const BASE_TICK_MS = 1000

// Drives the daily simulation clock based on the selected speed.
export const useGameLoop = () => {
  const speed = useGameStore((state) => state.speed)
  const advanceDay = useGameStore((state) => state.advanceDay)

  useEffect(() => {
    if (speed === 0) return
    const interval = window.setInterval(() => {
      advanceDay()
    }, BASE_TICK_MS / speed)

    return () => window.clearInterval(interval)
  }, [advanceDay, speed])
}
