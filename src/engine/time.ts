import type { GameDate } from '../types/game'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate()
}

export const advanceDate = (date: GameDate): GameDate => {
  const daysInMonth = getDaysInMonth(date.year, date.month)
  if (date.day < daysInMonth) {
    return { ...date, day: date.day + 1 }
  }
  if (date.month < 12) {
    return { year: date.year, month: date.month + 1, day: 1 }
  }
  return { year: date.year + 1, month: 1, day: 1 }
}

export const formatDate = (date: GameDate) => {
  const monthName = MONTH_NAMES[date.month - 1] ?? 'Unknown'
  return `${monthName} ${date.day}, ${date.year}`
}
