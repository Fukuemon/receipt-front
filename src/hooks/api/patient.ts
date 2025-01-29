// usePatientList.ts

import { patientSchema, type Patient } from '@/schema/patient'
import { useMemo } from 'react'
import { createFetcher, useFetchList } from './client'

export type PatientResponse = {
  患者名: string
}

const patientFetcher = createFetcher<Patient, PatientResponse>(
  patientSchema,
  (response) => ({
    name: response['患者名'],
  }),
)

/**
 * Patient一覧を取得するカスタムフック
 * @param name - オプションの検索条件（部分一致）
 * @returns フィルタリングされたPatientデータ、ロード状態、エラー情報
 */
export const usePatientList = (name?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_URL
  if (baseUrl == null) {
    throw new Error('API URL が定義されていません')
  }

  const requestUrl = `${baseUrl}?type=patient`

  const {
    data: patients,
    error,
    isLoading,
  } = useFetchList<Patient>(requestUrl, patientFetcher)

  const filteredPatients = useMemo(() => {
    if (typeof name !== 'string') {
      return patients
    }
    const trimmedName = name.trim()
    if (trimmedName === '') {
      return patients
    }
    const lowerName = trimmedName.toLowerCase()
    return (
      patients?.filter((patient) =>
        patient.name.toLowerCase().includes(lowerName),
      ) ?? []
    )
  }, [patients, name])

  return { data: filteredPatients, error, isLoading }
}
