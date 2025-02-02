import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { ZodType } from 'zod'

/**
 * 汎用フェッチャー
 * @template T - フロントエンドで使用するデータ型
 * @template R - APIレスポンスのデータ型
 * @param url - リクエストURL
 * @param schema - Zodスキーマによるデータ検証
 * @param mapResponse - レスポンスをフロントエンドのデータにマッピングする関数
 */
export const createFetcher =
  <T, R>(
    schema: ZodType<T>,
    mapResponse: (responseItem: R) => T,
  ): ((url: string) => Promise<T[]>) =>
  async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`)
    }

    const jsonData: unknown = await res.json()

    if (!Array.isArray(jsonData)) {
      throw new Error('Invalid data format: expected an array')
    }

    // レスポンスをマッピングして検証
    return jsonData.map((item) => {
      const mappedItem = mapResponse(item as R)
      return schema.parse(mappedItem)
    })
  }

/**
 * 汎用カスタムフック
 * @template T - データの型
 * @param url - リクエストURL
 * @param fetcher - データ取得用フェッチャー
 */
export const useFetchList = <T>(
  url: string,
  fetcher: (url: string) => Promise<T[]>,
  options?: SWRConfiguration,
) => {
  const { data, error, mutate } = useSWR<T[], Error>(url, fetcher, options)

  return {
    data,
    error,
    isLoading: data === undefined && error === undefined,
    mutate,
  }
}

export type GASResponse = {
  success: boolean
  message: string
}
