export const ServiceCode = {
  訪看I2: '訪看I2',
  訪看I3: '訪看I3',
  訪看I4: '訪看I4',
  訪看I5: '訪看I5',
  訪看I52超: '訪看I5・2超',
  予防看I2: '予防看I2',
  予防看I3: '予防看I3',
  予防看I4: '予防看I4',
  予防看I5: '予防看I5',
  予防看I52超: '予防看I5・2超',
  医療: '医',
} as const

export enum serviceCode {
  訪看I2 = '訪看I2',
  訪看I3 = '訪看I3',
  訪看I4 = '訪看I4',
  訪看I5 = '訪看I5',
  訪看I52超 = '訪看I5・2超',
  予防看I2 = '予防看I2',
  予防看I3 = '予防看I3',
  予防看I4 = '予防看I4',
  予防看I5 = '予防看I5',
  予防看I52超 = '予防看I5・2超',
  医療 = '医',
}

export type ServiceCode = (typeof ServiceCode)[keyof typeof ServiceCode]

export const ServiceCodeText: Record<ServiceCode, string> = {
  [ServiceCode.訪看I2]: '訪看I2',
  [ServiceCode.訪看I3]: '訪看I3',
  [ServiceCode.訪看I4]: '訪看I4',
  [ServiceCode.訪看I5]: '訪看I5',
  [ServiceCode.訪看I52超]: '訪看I5・2超',
  [ServiceCode.予防看I2]: '予防看I2',
  [ServiceCode.予防看I3]: '予防看I3',
  [ServiceCode.予防看I4]: '予防看I4',
  [ServiceCode.予防看I5]: '予防看I5',
  [ServiceCode.予防看I52超]: '予防看I5・2超',
  [ServiceCode.医療]: '医',
} as const

export const ServiceCodeDuration: Record<
  ServiceCode,
  { max: number; min: number }
> = {
  [ServiceCode.訪看I2]: { max: 29, min: 20 },
  [ServiceCode.訪看I3]: { max: 59, min: 30 },
  [ServiceCode.訪看I4]: { max: 89, min: 60 },
  [ServiceCode.訪看I5]: { max: 40, min: 21 },
  [ServiceCode.訪看I52超]: { max: 60, min: 31 },
  [ServiceCode.予防看I2]: { max: 29, min: 20 },
  [ServiceCode.予防看I3]: { max: 59, min: 30 },
  [ServiceCode.予防看I4]: { max: 89, min: 60 },
  [ServiceCode.予防看I5]: { max: 40, min: 21 },
  [ServiceCode.予防看I52超]: { max: 60, min: 31 },
  [ServiceCode.医療]: { max: 90, min: 30 },
} as const
