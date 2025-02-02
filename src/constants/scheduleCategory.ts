export const scheduleCategoryConstant = {
  night: 'night',
  emergency: 'emergency',
  hospitalization: 'hospitalization',
} as const

export type ScheduleCategory =
  (typeof scheduleCategoryConstant)[keyof typeof scheduleCategoryConstant]

export const ScheduleCategoryText: Record<ScheduleCategory, string> = {
  [scheduleCategoryConstant.night]: '夜勤',
  [scheduleCategoryConstant.emergency]: '緊急',
  [scheduleCategoryConstant.hospitalization]: '入院',
} as const
