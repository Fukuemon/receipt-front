'use client'
import { Calendar } from './_components/Calendar'

export default function SchedulePage() {
  const calendarIds: string[] = [
    '4e734946ed362fd798a0a3570839d36ae225dd0e56d859861d92692d7ef77293@group.calendar.google.com',
    'f7b6288c2a78502f848a696a2cf5990054c5b4f8ed6760c2d41769efc2189cb4@group.calendar.google.com',
  ]
  return (
    <main className="h-screen">
      <Calendar calendarIds={calendarIds} />
    </main>
  )
}
