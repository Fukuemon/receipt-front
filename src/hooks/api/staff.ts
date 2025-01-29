// useStaffList.ts

import type { Staff } from '@/schema/staff'
import { staffSchema } from '@/schema/staff'
import { useMemo } from 'react'
import { createFetcher, useFetchList } from './client'

export type StaffResponse = {
  名前: string
  カレンダーID: string
}

const staffFetcher = createFetcher<Staff, StaffResponse>(
  staffSchema,
  (response) => ({
    id: response['カレンダーID'],
    username: response['名前'],
  }),
)

/**
 * Staff一覧を取得するカスタムフック
 * @param name - オプションの検索条件（部分一致）
 * @returns フィルタリングされたStaffデータ、ロード状態、エラー情報
 */
export const useStaffList = (name?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_URL
  if (baseUrl == null) {
    throw new Error('API URL が定義されていません')
  }

  const requestUrl = `${baseUrl}?type=staff`

  const {
    data: staffs,
    error,
    isLoading,
  } = useFetchList<Staff>(requestUrl, staffFetcher)

  const filteredStaffs = useMemo(() => {
    if (typeof name !== 'string') {
      return staffs
    }
    const trimmedName = name.trim()
    if (trimmedName === '') {
      return staffs
    }
    const lowerName = trimmedName.toLowerCase()
    return (
      staffs?.filter((staff) =>
        staff.username.toLowerCase().includes(lowerName),
      ) ?? []
    )
  }, [staffs, name])

  return { data: filteredStaffs, error, isLoading }
}
