export const ccCategory = {
  normal: 'normal',
  accompany: 'accompany',
  handover: 'handover',
} as const

export type CcCategory = (typeof ccCategory)[keyof typeof ccCategory]

export const CcCategoryText: Record<CcCategory, string> = {
  [ccCategory.normal]: '通常',
  [ccCategory.accompany]: 'リハ同行',
  [ccCategory.handover]: '引き継ぎ',
} as const
