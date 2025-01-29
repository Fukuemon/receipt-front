// components/PatientPanel.tsx

import Table from '@/app/_components/Base/Table'
import { SearchBox } from '@/app/_components/Form/SearchBox'
import { usePatientList } from '@/hooks/api/patient'
import { useDebounce } from '@/hooks/useDebounce'
import type { Patient } from '@/schema/patient'
import { useState } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import styles from './style.module.css'

export type PatientPanelProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const PatientPanel = <T extends FieldValues>({
  control,
  name,
}: PatientPanelProps<T>) => {
  const { field } = useController({
    name,
    control,
  })

  const [searchPatient, setSearchPatient] = useState('')

  const debouncedSetSearchPatient = useDebounce((value: string) => {
    setSearchPatient(value)
  }, 500)

  const { data: patientsData, error: patientError } =
    usePatientList(searchPatient)

  const patients: Patient[] = patientsData ?? []

  if (patientError != null) {
    return <div>エラーが発生しました</div>
  }

  return (
    <div className={styles.userEdit}>
      <div className={styles.searchInput}>
        <SearchBox
          onSearch={debouncedSetSearchPatient}
          placeholder="患者を検索"
        />
      </div>
      <div className={styles.table}>
        <Table>
          <Table.Header>
            <Table.Row className={styles.userRow}>
              <Table.Cell expanded>名前</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {patients.map((patient) => (
              <Table.Row key={patient.name}>
                <Table.Cell>
                  <label className={styles.option}>
                    <input
                      className={styles.input}
                      type="radio"
                      {...field}
                      checked={field.value === patient.name}
                      value={patient.name}
                    />
                    <span className={styles.label}>{patient.name}</span>
                  </label>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
