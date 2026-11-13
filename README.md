# JSONPlaceholder — Usuarios y publicaciones

Repositorio: **https://github.com/arnelglez/jsonplaceholder-users-posts**

Aplicación de demostración en React y TypeScript que consume la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com): listado de usuarios con búsqueda, publicaciones por usuario y creación simulada de posts con validación de formulario.

## Requisitos

- Node.js 20 o superior
- npm 10+

## Cómo ejecutarlo

```bash
cp .env.example .env   # opcional; por defecto apunta a JSONPlaceholder
npm install
npm run dev            # http://localhost:5173
npm test               # Vitest + Testing Library (18 tests)
npm run build
npm run preview
```

## Funcionalidad

1. **Usuarios** — `GET /users`, búsqueda local por nombre (case-insensitive), selección en panel lateral (layout master-detail).
2. **Publicaciones** — Al elegir un usuario navegas a `/users/:userId/posts`; `GET /posts?userId={id}` con carga, error y reintento.
3. **Nueva publicación** — Formulario con **título** y **texto** obligatorios (Zod + react-hook-form); `POST /posts` y el nuevo item **al inicio** de la lista (la API no persiste datos).
4. **Feedback** — [Sonner](https://sonner.emilkowal.ski/) en éxito/error de creación y fallos de red; banners inline con reintento.

## Decisiones técnicas

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4**
- **Arquitectura feature-first** (`features/`, `core/`) — ver [ARCHITECTURE.md](ARCHITECTURE.md); alias `~/`
- **React Router 7** — `/` y `/users/:userId/posts`; `userId` en URL (no `location.state`)
- **Responsive** — desktop: lista izquierda / detalle derecha; móvil: lista arriba, detalle abajo
- **`core/network/httpClient`** — `http()` + `VITE_API_URL`
- **Zustand** — solo highlight visual del post recién creado
- **Formulario** — react-hook-form + Zod
- **Búsqueda en cliente** — la API no filtra por nombre

## Seguridad (frontend)

- Allowlist de rutas API, validación de JSON, límites de entrada, `fetch` endurecido
- Cabeceras en [`vercel.json`](vercel.json) para despliegue estático
- Tests en `src/security/offensive.test.tsx`

## Qué haría con más tiempo

- TanStack Query / SWR para cacheo
- MSW y pruebas e2e (Playwright)
- **GitHub Actions** (`test` + `build`)
- Página dedicada solo para crear post (`arch-form-crud`)
- Paginación o virtualización de posts
- Auditoría a11y y tema oscuro

## Uso de herramientas de IA

Asistencia de Cursor limitada al código del repositorio (sin pegar conversaciones):

| Área | Asistencia IA | Revisión del autor |
|------|---------------|-------------------|
| Scaffold | Vite, dependencias | Stack final, Vitest, Tailwind v4 |
| Arquitectura | Borrador feature-first | Alineado a `arch-react` |
| Seguridad / parsers | Allowlist, tests ofensivos | Ajustes tras `npm test` |
| UI / layout | Tailwind, modal (luego descartado) | Tema sobrio + master-detail + Router |
| Tests | Esqueleto RTL | asserts, `fireEvent.submit`, mocks `fetch` |
| README | Estructura | Texto final y límites de la API |

## Tiempo de desarrollo

Aproximadamente **1 h 30 min** de trabajo en una sola sesión (13 nov 2026, ~16:50–18:15, UTC−5): MVP con tests y README, más iteraciones posteriores (diseño, arquitectura feature-first, seguridad, React Router, Sonner) antes del push final.

## Licencia

MIT — uso libre para fines de evaluación técnica.
