import type { ZodType } from 'zod'
import { z } from 'zod'

export enum PatientKey {
  Name = 'name',
}

export type Patient = {
  [PatientKey.Name]: string
}

export const patientSchema = z.object({
  [PatientKey.Name]: z.string(),
}) satisfies ZodType<Patient>
