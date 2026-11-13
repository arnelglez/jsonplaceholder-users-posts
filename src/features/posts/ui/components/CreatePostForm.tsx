import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AlertBanner } from '~/core/ui/AlertBanner'
import { StatusMessage } from '~/core/ui/StatusMessage'
import {
  createPostFormSchema,
  type CreatePostFormValues,
} from '~/features/posts/domain/schemas/post.schema'

export type { CreatePostFormValues }

type CreatePostFormProps = {
  userId: number
  submitting: boolean
  submitError: string | null
  onSubmit: (values: CreatePostFormValues) => void | Promise<void>
  onClearError: () => void
}

export function CreatePostForm({
  userId,
  submitting,
  submitError,
  onSubmit,
  onClearError,
}: CreatePostFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostFormSchema),
    mode: 'onChange',
    defaultValues: { title: '', body: '' },
  })

  const onValid = async (values: CreatePostFormValues) => {
    onClearError()
    await onSubmit(values)
    reset()
  }

  const invalidRing = 'border-danger focus-visible:shadow-[0_0_0_3px_rgb(185_28_28_/_0.15)]'
  const validRing = 'border-line'

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="mt-8 space-y-4 border-t border-line pt-6"
      noValidate
    >
      <h3 className="text-base font-semibold text-ink">Nueva publicación</h3>
      <input type="hidden" name="userId" value={userId} readOnly />

      <AlertBanner
        variant="info"
        message="Título y texto son obligatorios. Si el envío falla, verás un mensaje de error debajo."
      />

      {submitError ? <StatusMessage message={submitError} /> : null}

      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-ink-muted">
          Título
        </label>
        <input
          id="post-title"
          type="text"
          maxLength={200}
          autoComplete="off"
          aria-invalid={Boolean(errors.title)}
          className={`field-focus mt-1.5 w-full rounded-lg border bg-paper-raised px-3 py-2 text-sm text-ink ${
            errors.title ? invalidRing : validRing
          }`}
          {...register('title')}
        />
        {errors.title ? (
          <p className="mt-1 text-xs text-danger" role="alert">
            {errors.title.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="post-body" className="block text-sm font-medium text-ink-muted">
          Texto
        </label>
        <textarea
          id="post-body"
          rows={4}
          maxLength={5000}
          autoComplete="off"
          aria-invalid={Boolean(errors.body)}
          className={`field-focus mt-1.5 w-full resize-y rounded-lg border bg-paper-raised px-3 py-2 text-sm text-ink ${
            errors.body ? invalidRing : validRing
          }`}
          {...register('body')}
        />
        {errors.body ? (
          <p className="mt-1 text-xs text-danger" role="alert">
            {errors.body.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!isValid || submitting}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-[background-color,opacity] duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Guardando…' : 'Crear publicación'}
      </button>
    </form>
  )
}
