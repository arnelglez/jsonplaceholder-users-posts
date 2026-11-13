import { type FormEvent, useState } from 'react'
import { StatusMessage } from './StatusMessage'

export type CreatePostFormValues = {
  title: string
  body: string
}

type CreatePostFormProps = {
  userId: number
  submitting: boolean
  submitError: string | null
  onSubmit: (values: CreatePostFormValues) => void | Promise<void>
  onClearError: () => void
}

type FieldErrors = {
  title?: string
  body?: string
}

function validate(values: CreatePostFormValues): FieldErrors {
  const errors: FieldErrors = {}
  if (!values.title.trim()) {
    errors.title = 'El título es obligatorio.'
  }
  if (!values.body.trim()) {
    errors.body = 'El texto es obligatorio.'
  }
  return errors
}

export function CreatePostForm({
  userId,
  submitting,
  submitError,
  onSubmit,
  onClearError,
}: CreatePostFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    onClearError()
    const values = { title, body }
    const errors = validate(values)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      return
    }
    await onSubmit(values)
    setTitle('')
    setBody('')
    setFieldErrors({})
  }

  const titleInvalid = Boolean(fieldErrors.title)
  const bodyInvalid = Boolean(fieldErrors.body)
  const canSubmit = title.trim().length > 0 && body.trim().length > 0 && !submitting

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t border-slate-200 pt-6" noValidate>
      <h3 className="text-base font-semibold text-slate-900">Nueva publicación</h3>
      <input type="hidden" name="userId" value={userId} readOnly />

      {submitError ? <StatusMessage message={submitError} /> : null}

      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-slate-700">
          Título
        </label>
        <input
          id="post-title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={titleInvalid}
          aria-describedby={titleInvalid ? 'post-title-error' : undefined}
          className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
            titleInvalid
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
          }`}
        />
        {fieldErrors.title ? (
          <p id="post-title-error" className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.title}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="post-body" className="block text-sm font-medium text-slate-700">
          Texto
        </label>
        <textarea
          id="post-body"
          name="body"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          aria-invalid={bodyInvalid}
          aria-describedby={bodyInvalid ? 'post-body-error' : undefined}
          className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
            bodyInvalid
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
          }`}
        />
        {fieldErrors.body ? (
          <p id="post-body-error" className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.body}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {submitting ? 'Guardando…' : 'Publicar'}
      </button>
    </form>
  )
}
