import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CreatePostForm } from './CreatePostForm'

describe('CreatePostForm', () => {
  it('muestra validación si el título y el texto están vacíos', async () => {
    const onSubmit = vi.fn()
    const { container } = render(
      <CreatePostForm
        userId={1}
        submitting={false}
        submitError={null}
        onSubmit={onSubmit}
        onClearError={vi.fn()}
      />,
    )

    const form = container.querySelector('form')
    expect(form).toBeTruthy()
    fireEvent.submit(form!)

    await waitFor(() => {
      expect(screen.getByText('El título es obligatorio.')).toBeInTheDocument()
    })
    expect(screen.getByText('El texto es obligatorio.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('envía título y texto cuando el formulario es válido', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(
      <CreatePostForm
        userId={1}
        submitting={false}
        submitError={null}
        onSubmit={onSubmit}
        onClearError={vi.fn()}
      />,
    )

    await user.type(screen.getByLabelText(/^título$/i), 'Mi título')
    await user.type(screen.getByLabelText(/^texto$/i), 'Contenido de la publicación')
    await user.click(screen.getByRole('button', { name: /crear publicación/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'Mi título',
        body: 'Contenido de la publicación',
      })
    })
  })
})
