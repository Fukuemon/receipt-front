import type { ZodType } from 'zod'
import { z } from 'zod'

export enum StaffKey {
  CalendarId = 'id',
  Name = 'username',
}

export type Staff = {
  [StaffKey.CalendarId]: string
  [StaffKey.Name]: string
}

export const staffSchema = z.object({
  [StaffKey.CalendarId]: z.string(),
  [StaffKey.Name]: z.string(),
}) satisfies ZodType<Staff>

export enum StaffSearchKey {
  Name = 'username',
}

export type StaffSearchParams = {
  [StaffSearchKey.Name]: string
}

export const staffSearchSchema = z.object({
  [StaffSearchKey.Name]: z.string(),
}) satisfies ZodType<StaffSearchParams>
