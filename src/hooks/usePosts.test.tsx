import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Post } from '../api/types'
import { usePosts } from './usePosts'

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'Post A', body: 'Body A' },
  { id: 2, userId: 1, title: 'Post B', body: 'Body B' },
]

describe('usePosts', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPosts),
        } as Response),
      ),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('añade una publicación al inicio de la lista', async () => {
    const { result } = renderHook(() => usePosts(1))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.posts).toHaveLength(2)

    const newPost: Post = { id: 99, userId: 1, title: 'Nuevo', body: 'Creado' }
    act(() => {
      result.current.prependPost(newPost)
    })

    expect(result.current.posts[0]).toEqual(newPost)
    expect(result.current.posts).toHaveLength(3)
  })
})
