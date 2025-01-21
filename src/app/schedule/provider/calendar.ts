import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// export const CurrentCalendarDateAtom = atomWithStorage<Date>(
//   'storedCalendarDate',
//   new Date(),
// )
export const CurrentCalendarDateAtom = atom<Date>(new Date())

export const CurrentCalendarViewAtom = atomWithStorage<string>(
  'storedCalendarView',
  'dayGridMonth',
)
