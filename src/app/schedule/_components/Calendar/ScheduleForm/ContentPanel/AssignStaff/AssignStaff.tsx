import Table from '@/app/_components/Base/Table'
import { SearchBox } from '@/app/_components/Form/SearchBox'
import { useStaffList } from '@/hooks/api/staff'
import { useDebounce } from '@/hooks/useDebounce'
import type { Staff } from '@/schema/staff'
import { useState } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { useController } from 'react-hook-form'
import styles from './style.module.css'

export type StaffPanelProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const StaffPanel = <T extends FieldValues>({
  control,
  name,
}: StaffPanelProps<T>) => {
  const { field } = useController({
    name,
    control,
  })

  // 検索キーワードの状態管理
  const [searchStaff, setSearchStaff] = useState('')
  const debouncedSetSearchStaff = useDebounce((value: string) => {
    setSearchStaff(value)
  }, 500)

  const { data: staffsData, error: staffError } = useStaffList(searchStaff)

  const staffs: Staff[] = staffsData ?? [] // 検索キーワードの状態管理

  if (staffError != null) {
    return <div>エラーが発生しました</div>
  }

  return (
    <div className={styles.userEdit}>
      <div className={styles.searchInput}>
        <SearchBox
          onSearch={debouncedSetSearchStaff}
          placeholder="メンバーを検索"
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
            {staffs.map((staff) => (
              <Table.Row key={staff.id}>
                <Table.Cell>
                  <label className={styles.option}>
                    <input
                      className={styles.input}
                      type="radio"
                      {...field}
                      checked={field.value === staff.id}
                      value={staff.id}
                    />
                    <span className={styles.label}>{staff.username}</span>
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
