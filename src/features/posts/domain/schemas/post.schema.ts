import { z } from 'zod'
import {
  MAX_POST_BODY_LENGTH,
  MAX_POST_TITLE_LENGTH,
  MAX_USER_ID,
  MIN_USER_ID,
} from '~/core/security/limits'

export const createPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'El título es obligatorio.')
    .max(MAX_POST_TITLE_LENGTH, `Máximo ${MAX_POST_TITLE_LENGTH} caracteres.`),
  body: z
    .string()
    .trim()
    .min(1, 'El texto es obligatorio.')
    .max(MAX_POST_BODY_LENGTH, `Máximo ${MAX_POST_BODY_LENGTH} caracteres.`),
})

export type CreatePostFormValues = z.infer<typeof createPostFormSchema>

export const createPostInputSchema = createPostFormSchema.extend({
  userId: z.number().int().min(MIN_USER_ID).max(MAX_USER_ID),
})
