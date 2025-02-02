export const ScheduleType = {
  normal: 'normal',
  visit: 'visit',
} as const

export enum scheduleType {
  normal = 'normal',
  visit = 'visit',
}

export type ScheduleType = (typeof ScheduleType)[keyof typeof ScheduleType]

export const ScheduleTypeText: Record<ScheduleType, string> = {
  [ScheduleType.normal]: '通常',
  [ScheduleType.visit]: '訪問',
} as const
