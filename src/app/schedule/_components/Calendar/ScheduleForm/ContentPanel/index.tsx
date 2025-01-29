// components/CreatePanel.tsx

import { Loading } from '@/app/_components/Base/Loading'
import type { ScheduleCreate } from '@/schema/schedule'
import { ScheduleKey, VisitScheduleKey } from '@/schema/schedule'
import type { FC } from 'react'
import { Suspense, useEffect } from 'react'
import type { Control, UseFormSetValue } from 'react-hook-form'
import { StaffPanel } from './AssignStaff/AssignStaff'
import { ScheduleDatePanel } from './ScheduleDate/ScheduleDate'
import styles from './style.module.css'
import { TextareaPanel } from './Textarea'
import { PatientPanel } from './VisitInfo/Patient'
import { VisitCategoryPanel } from './VisitInfo/VisitCategory'

export type CreatePanelProps = {
  control: Control<ScheduleCreate>
  setValue: UseFormSetValue<ScheduleCreate>
  currentId: ScheduleKey | VisitScheduleKey | undefined
  setCurrentId: (id: ScheduleKey | VisitScheduleKey) => void
  isVisitSchedule: boolean
}

export const CreatePanel: FC<CreatePanelProps> = ({
  control,
  setValue,
  currentId,
  setCurrentId,
  isVisitSchedule,
}) => {
  useEffect(() => {
    if (currentId === null || currentId === undefined) {
      setCurrentId(ScheduleKey.ScheduleDate)
    }
  }, [currentId, setCurrentId])

  return (
    <div className={styles.createPanel}>
      <div className={styles.container}>
        {currentId === ScheduleKey.Title && (
          <TextareaPanel
            control={control}
            name={ScheduleKey.Title}
            placeholder="タイトル"
          />
        )}

        {currentId === ScheduleKey.ScheduleDate && (
          <ScheduleDatePanel
            control={control}
            dateName={ScheduleKey.ScheduleDate}
            endTimeName={ScheduleKey.EndTime}
            isVisitSchedule={isVisitSchedule}
            serviceCodeName={VisitScheduleKey.ServiceCode}
            serviceTimeName={VisitScheduleKey.ServiceTime}
            setValue={setValue}
            startTimeName={ScheduleKey.StartTime}
          />
        )}
        {currentId === VisitScheduleKey.PatientName && (
          <Suspense fallback={<Loading />}>
            <PatientPanel
              control={control}
              name={VisitScheduleKey.PatientName}
            />
          </Suspense>
        )}
        {currentId === ScheduleKey.StaffId && (
          <Suspense fallback={<Loading />}>
            <StaffPanel control={control} name={ScheduleKey.StaffId} />
          </Suspense>
        )}
        {currentId === VisitScheduleKey.ScheduleCategory && (
          <VisitCategoryPanel control={control} />
        )}
      </div>
    </div>
  )
}
