import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'

import styles from './style.module.css'

import { ServiceCode, ServiceCodeText } from '@/constants/serviceCode'

export type ServiceCodeEditProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const serviceCodeOptions = {
  [ServiceCode.訪看I2]: {
    label: ServiceCodeText[ServiceCode.訪看I2],
  },
  [ServiceCode.訪看I3]: {
    label: ServiceCodeText[ServiceCode.訪看I3],
  },
  [ServiceCode.訪看I4]: {
    label: ServiceCodeText[ServiceCode.訪看I4],
  },
  [ServiceCode.訪看I5]: {
    label: ServiceCodeText[ServiceCode.訪看I5],
  },
  [ServiceCode.訪看I52超]: {
    label: ServiceCodeText[ServiceCode.訪看I52超],
  },
  [ServiceCode.予防看I2]: {
    label: ServiceCodeText[ServiceCode.予防看I2],
  },
  [ServiceCode.予防看I3]: {
    label: ServiceCodeText[ServiceCode.予防看I3],
  },
  [ServiceCode.予防看I4]: {
    label: ServiceCodeText[ServiceCode.予防看I4],
  },
  [ServiceCode.予防看I5]: {
    label: ServiceCodeText[ServiceCode.予防看I5],
  },
  [ServiceCode.予防看I52超]: {
    label: ServiceCodeText[ServiceCode.予防看I52超],
  },
  [ServiceCode.医療]: {
    label: ServiceCodeText[ServiceCode.医療],
  },
}

export const ServiceCodeEdit = <T extends FieldValues>({
  name,
  control,
}: ServiceCodeEditProps<T>) => {
  const { field } = useController({
    control,
    name,
  })

  return (
    <div className={styles.serviceCodeEdit}>
      <h2 className={styles.heading}>サービスコードを選んでください</h2>
      <div className={styles.content}>
        {Object.entries(serviceCodeOptions).map(([key, value]) => {
          return (
            <label className={styles.option} key={key}>
              <input
                className={styles.input}
                type="radio"
                {...field}
                checked={field.value === key}
                value={key}
              />
              <span className={styles.label}>{value.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}
