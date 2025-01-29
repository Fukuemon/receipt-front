import type { FC } from 'react'

import { DatePicker } from '@/app/_components/Form/DatePicker'
import type { Control } from 'react-hook-form'
import { LeftControls } from './LeftControls/LeftControls'
type Props = {
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  control: Control<{ date: Date }>
}

export const Toolbar: FC<Props> = ({ onPrev, onNext, onToday, control }) => {
  return (
    <div className="flex h-16 items-center justify-between gap-4 md:gap-10">
      <LeftControls onNext={onNext} onPrev={onPrev} onToday={onToday} />
      <DatePicker control={control} label="日付" name="date" />
    </div>
  )
}
