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
npm test               # Vitest + Testing Library
npm run qa             # lint + test + build + npm audit
npm run build
npm run preview
```

## Funcionalidad

1. **Inicio** — Landing en `/` y acceso en `/login` (demo: usuario y contraseña `admin`; sesión en el navegador, sin backend).
2. **Usuarios** — `GET /users`, búsqueda local por nombre (case-insensitive), selección en panel lateral (layout master-detail).
3. **Publicaciones** — Tras entrar al panel (`/app`), al elegir un usuario navegas a `/app/users/:userId/posts`; `GET /posts?userId={id}` con carga, error y reintento.
4. **Nueva publicación** — Formulario con **título** y **texto** obligatorios (Zod + react-hook-form); `POST /posts` y el nuevo item **al inicio** de la lista (la API no persiste datos).
5. **Feedback** — Banners para info y errores de red; [Sonner](https://sonner.emilkowal.ski/) arriba a la derecha al entrar, salir y crear un post con éxito.

## Decisiones técnicas

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4**
- **Arquitectura feature-first** (`features/`, `core/`) — ver [ARCHITECTURE.md](ARCHITECTURE.md); alias `~/`
- **React Router 7** — `/`, `/login`, `/app`, `/app/users/:userId/posts`; `userId` en URL (no `location.state`)
- **Responsive** — desktop: lista izquierda / detalle derecha; móvil: lista arriba, detalle abajo
- **`core/network/httpClient`** — `http()` + `VITE_API_URL`
- **Zustand** — solo highlight visual del post recién creado
- **Formulario** — react-hook-form + Zod
- **Búsqueda en cliente** — la API no filtra por nombre

## UI y UX

La interfaz **no pretende ser referencia de diseño de producto**: es un layout sobrio y legible para una prueba técnica, con foco en flujo claro (buscar → elegir usuario → ver y crear posts), estados de carga/error visibles y layout responsivo master-detail.

Prioricé **código, datos, validación, tests y estructura** frente a pulido visual (ilustración, microinteracciones extensas, sistema de diseño propio). Para el alcance y el tiempo de la prueba, considero que el nivel de UI/UX es **aceptable**; en un proyecto real dedicaría más tiempo a investigación con usuarios, jerarquía visual y accesibilidad auditada (véase “Qué haría con más tiempo”).

## Seguridad (frontend)

- Allowlist de rutas API, validación de JSON, límites de entrada, `fetch` endurecido
- Tras login, redirección acotada (`safeAppRedirectPath`); bloqueo tras 5 intentos fallidos (30 s)
- Cabeceras en [`vercel.json`](vercel.json) para despliegue estático
- QA: `npm run qa` · tests ofensivos en `src/core/security/offensive.test.tsx`

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

Aproximadamente **30 minutos** (13 nov 2026), incluyendo MVP con tests, README y ajustes de entrega (landing, login demo, mensajes y documentación).

## Licencia

MIT — uso libre para fines de evaluación técnica.
