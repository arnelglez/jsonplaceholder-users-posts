/** JSONPlaceholder ships exactly 10 users (ids 1–10). */
export const MIN_USER_ID = 1
export const MAX_USER_ID = 10

export const MAX_POST_TITLE_LENGTH = 200
export const MAX_POST_BODY_LENGTH = 5_000

export const MAX_USER_NAME_LENGTH = 120
export const MAX_DISPLAY_FIELD_LENGTH = 2_000

/** Caps client-side work if the API (or MITM) returns oversized lists. */
export const MAX_USERS_LIST = 25
export const MAX_POSTS_LIST = 150

export const API_ORIGIN = 'https://jsonplaceholder.typicode.com'
