import { create } from 'zustand'

type PostsUiState = {
  highlightPostId: number | null
  setHighlightPostId: (postId: number | null) => void
}

export const usePostsUiStore = create<PostsUiState>((set) => ({
  highlightPostId: null,
  setHighlightPostId: (postId) => set({ highlightPostId: postId }),
}))
