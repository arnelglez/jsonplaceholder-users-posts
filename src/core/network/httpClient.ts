import { API_ORIGIN } from '~/core/security/limits'
import {
  assertSafeApiPath,
  assertTrustedApiUrl,
} from '~/core/security/validation'
import { HttpRequestError } from './errors'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? API_ORIGIN

type SafeRequestInit = {
  method?: 'GET' | 'POST'
  body?: string
}

export async function http(path: string, init?: SafeRequestInit): Promise<unknown> {
  assertSafeApiPath(path)
  const method = init?.method ?? 'GET'
  if (method !== 'GET' && method !== 'POST') {
    throw new HttpRequestError('Método HTTP no permitido', 0)
  }
  if (method === 'GET' && init?.body) {
    throw new HttpRequestError('GET no admite cuerpo', 0)
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      body: init?.body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
      redirect: 'error',
      referrerPolicy: 'no-referrer',
      cache: 'no-store',
    })
  } catch {
    throw new HttpRequestError('No se pudo conectar con el servidor. Revisa tu conexión.', 0)
  }

  assertTrustedApiUrl(response.url, API_BASE_URL)

  if (!response.ok) {
    throw new HttpRequestError(`Error ${response.status}: ${response.statusText}`, response.status)
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    throw new HttpRequestError('Tipo de contenido de respuesta no permitido', 0)
  }

  try {
    return await response.json()
  } catch {
    throw new HttpRequestError('La respuesta del servidor no es JSON válido', 0)
  }
}
