export class HttpRequestError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpRequestError'
    this.status = status
  }
}

/** @deprecated alias for tests and legacy imports */
export const ApiError = HttpRequestError
