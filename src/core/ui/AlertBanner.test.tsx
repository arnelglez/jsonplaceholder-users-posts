import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { AlertBanner } from './AlertBanner'

describe('AlertBanner', () => {
  it('renders info with status role', () => {
    render(<AlertBanner variant="info" message="Nota informativa" />)
    expect(screen.getByRole('status')).toHaveTextContent('Nota informativa')
  })

  it('renders error with alert role and retry', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<AlertBanner variant="error" message="Fallo de red" onRetry={onRetry} />)
    await user.click(screen.getByRole('button', { name: /reintentar/i }))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
