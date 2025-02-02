// components/ScheduleFormContainer.tsx

import Modal from '@/app/_components/Base/Modal'
import { TextTab } from '@/app/_components/Base/TextTab'
import { scheduleType } from '@/constants/scheduleType'
import { serviceCode } from '@/constants/serviceCode'
import { useSideTransition } from '@/hooks/useSideTransition'
import type { Schedule, ScheduleCreate } from '@/schema/schedule'
import {
  ScheduleKey,
  scheduleSchema,
  VisitScheduleKey,
} from '@/schema/schedule'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { CurrentScheduleTypeAtom } from '../../../provider/schedule'
import { CreatePanel } from './ContentPanel'
import { SelectPanel, type ButtonContentProps } from './SelectPanel'
import { FreeTextSelect } from './SelectPanel/FreeTextSelect'
import { OptionSelect } from './SelectPanel/OptionSelect'
import { ScheduleCategorySelect } from './SelectPanel/ScheduleCategorySelect'
import { ScheduleDateSelect } from './SelectPanel/ScheduleDate'
import styles from './style.module.css' // 適切なCSSモジュールを使用してください

export type ScheduleFormProps = {
  startDate: Date
  onSubmit: (data: ScheduleCreate) => void | Promise<void>
}

const tabs: ComponentPropsWithoutRef<typeof TextTab>['tabs'] = [
  {
    id: 'normal',
    label: '通常',
  },
  {
    id: 'visit',
    label: '訪問',
  },
] as const

export const ScheduleFormContainer: FC<ScheduleFormProps> = ({
  startDate,
  onSubmit,
}) => {
  const defaultStartDate = startDate ?? new Date()
  defaultStartDate.setHours(9, 0, 0, 0)
  const [currentId, setCurrentId] = useState<
    ScheduleKey | VisitScheduleKey | undefined
  >(ScheduleKey.ScheduleDate)

  const [currentScheduleType, setCurrentScheduleType] = useAtom(
    CurrentScheduleTypeAtom,
  )
  const { activeTab } = useSideTransition(
    'tab',
    tabs.map((tab) => tab.id),
    currentScheduleType,
    'visit',
  )

  const scheduleCreate = useForm<ScheduleCreate>({
    defaultValues: {
      [ScheduleKey.StaffId]: '',
      [ScheduleKey.StaffName]: '未選択',
      [ScheduleKey.ScheduleType]:
        activeTab === 'visit' ? scheduleType.visit : scheduleType.normal,
      [ScheduleKey.ScheduleDate]: defaultStartDate,
      [ScheduleKey.StartTime]: defaultStartDate.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      [ScheduleKey.EndTime]: defaultStartDate.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      [ScheduleKey.Title]: '',
      [ScheduleKey.Description]: '',
      ...(activeTab === 'visit'
        ? {
            [VisitScheduleKey.PatientName]: '未選択',
            [VisitScheduleKey.ServiceCode]: serviceCode.訪看I2,
            [VisitScheduleKey.ServiceTime]: 29,
            [VisitScheduleKey.ScheduleCategory]: [],
          }
        : {}),
    } as Schedule,
    resolver: zodResolver(scheduleSchema),
  })

  useEffect(() => {
    scheduleCreate.setValue(
      ScheduleKey.ScheduleType,
      activeTab === 'visit' ? scheduleType.visit : scheduleType.normal,
    )
  }, [activeTab, scheduleCreate])

  // フォーム送信ハンドラー
  const handleFormSubmit = async (data: ScheduleCreate) => {
    await onSubmit(data)
  }

  // 表示に使用するデータ定義
  const scheduleMap: ButtonContentProps[] = [
    ...(activeTab === 'normal'
      ? [
          {
            id: ScheduleKey.Title,
            label: 'タイトル',
            content: (
              <FreeTextSelect
                content={scheduleCreate.watch(ScheduleKey.Title)}
                placeholder="タイトル"
              />
            ),
          },
        ]
      : []),
    {
      id: ScheduleKey.ScheduleDate,
      label: activeTab === 'visit' ? '訪問日時' : '予定日時',
      content: (
        <ScheduleDateSelect
          endTime={scheduleCreate.watch(ScheduleKey.EndTime)}
          isVisitSchedule={activeTab === 'visit'}
          scheduleDate={scheduleCreate.watch(ScheduleKey.ScheduleDate)}
          serviceCode={scheduleCreate.watch(VisitScheduleKey.ServiceCode)}
          serviceTime={scheduleCreate.watch(VisitScheduleKey.ServiceTime)}
          startTime={scheduleCreate.watch(ScheduleKey.StartTime)}
        />
      ),
    },
    ...(activeTab === 'visit'
      ? [
          {
            id: VisitScheduleKey.PatientName,
            label: '患者',
            content: (
              <OptionSelect
                content={
                  scheduleCreate.watch(VisitScheduleKey.PatientName) ?? '未選択'
                }
              />
            ),
          },
        ]
      : []),
    {
      id: ScheduleKey.StaffId,
      label: activeTab === 'visit' ? '担当者' : '予定者',
      content: (
        <OptionSelect
          content={scheduleCreate.watch(ScheduleKey.StaffName) ?? '未選択'}
        />
      ),
    },
    ...(activeTab === 'visit'
      ? [
          {
            id: VisitScheduleKey.ScheduleCategory,
            label: '訪問の種類',
            content: (
              <ScheduleCategorySelect
                scheduleCategory={scheduleCreate.watch(
                  VisitScheduleKey.ScheduleCategory,
                )}
              />
            ),
          },
        ]
      : []),
  ]

  return (
    <Modal.Body
      className={styles.scheduleForm}
      headerContent={
        <div className={styles.headerContent}>
          <TextTab
            defaultTabIndex={tabs.findIndex(
              (tab) => tab.id === currentScheduleType,
            )}
            options={{
              onTabChange: (tabId: string) => {
                setCurrentScheduleType(tabId)
              },
            }}
            tabs={tabs}
            variant="white"
          />
        </div>
      }
      stickyFooter={
        <Modal.Closure
          disabled={scheduleCreate.formState.isSubmitting}
          onClick={scheduleCreate.handleSubmit(handleFormSubmit)}
        >
          作成
        </Modal.Closure>
      }
      title="スケジュール作成"
    >
      <div className={styles.visitScheduleEdit}>
        <div className={styles.selectPanel}>
          <SelectPanel
            currentId={currentId}
            scheduleMap={scheduleMap}
            setCurrentId={setCurrentId}
          />
        </div>
        <div className={styles.editPanel}>
          <CreatePanel
            control={scheduleCreate.control}
            currentId={currentId}
            isVisitSchedule={activeTab === 'visit'}
            setCurrentId={setCurrentId}
            setValue={scheduleCreate.setValue}
          />
        </div>
      </div>
    </Modal.Body>
  )
}
