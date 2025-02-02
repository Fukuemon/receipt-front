import type { ScheduleCategory } from '@/constants/scheduleCategory'
import { scheduleType } from '@/constants/scheduleType'
import type { ServiceCode } from '@/constants/serviceCode'
import { serviceCode } from '@/constants/serviceCode'
import type { ZodType } from 'zod'
import { z } from 'zod'

export enum ScheduleKey {
  StaffId = 'staffId',
  StaffName = 'staffName',
  Title = 'title',
  ScheduleDate = 'scheduleDate',
  StartTime = 'startTime',
  EndTime = 'endTime',
  ScheduleType = 'scheduleType',
  Description = 'description',
}

export type BaseSchedule = {
  [ScheduleKey.StaffId]: string
  [ScheduleKey.StaffName]: string
  [ScheduleKey.Title]: string
  [ScheduleKey.ScheduleDate]: Date
  [ScheduleKey.StartTime]: string
  [ScheduleKey.EndTime]: string
  [ScheduleKey.Description]: string
}

const baseScheduleSchema = z.object({
  [ScheduleKey.StaffId]: z.string(),
  [ScheduleKey.StaffName]: z.string(),
  [ScheduleKey.Title]: z.string(),
  [ScheduleKey.ScheduleDate]: z.date(),
  [ScheduleKey.StartTime]: z.string(),
  [ScheduleKey.EndTime]: z.string(),
  [ScheduleKey.Description]: z.string(),
}) satisfies ZodType<BaseSchedule>

export enum VisitScheduleKey {
  PatientName = 'patientName',
  ScheduleCategory = 'scheduleCategory',
  ServiceCode = 'serviceCode',
  ServiceTime = 'serviceTime',
}

export type VisitSchedule = BaseSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.visit
  [VisitScheduleKey.PatientName]: string
  [VisitScheduleKey.ScheduleCategory]?: ScheduleCategory[]
  [VisitScheduleKey.ServiceCode]: ServiceCode
  [VisitScheduleKey.ServiceTime]: number
}

export const visitScheduleSchema = baseScheduleSchema.extend({
  [ScheduleKey.ScheduleType]: z.literal(scheduleType.visit),
  [VisitScheduleKey.PatientName]: z.string(),
  [VisitScheduleKey.ServiceCode]: z.nativeEnum(serviceCode),
  [VisitScheduleKey.ServiceTime]: z.number().min(0),
}) satisfies ZodType<VisitSchedule>

export type NormalSchedule = BaseSchedule & {
  [ScheduleKey.ScheduleType]: scheduleType.normal
}

export const normalScheduleSchema = baseScheduleSchema.extend({
  [ScheduleKey.ScheduleType]: z.literal(scheduleType.normal),
}) satisfies ZodType<NormalSchedule>

export type Schedule = NormalSchedule | VisitSchedule

export type VisitScheduleCreate = VisitSchedule
export type NormalScheduleCreate = NormalSchedule

export type ScheduleCreate = VisitScheduleCreate | NormalScheduleCreate

export const scheduleSchema = baseScheduleSchema.and(
  z.union([visitScheduleSchema, normalScheduleSchema]),
) satisfies ZodType<Schedule>

export const visitScheduleCreateSchema = visitScheduleSchema

export const normalScheduleCreateSchema = normalScheduleSchema

export const scheduleCreateSchema = z.union([
  visitScheduleCreateSchema,
  normalScheduleCreateSchema,
]) satisfies ZodType<ScheduleCreate>
