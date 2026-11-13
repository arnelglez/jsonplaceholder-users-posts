# JSONPlaceholder — Usuarios y publicaciones

Aplicación de demostración en React y TypeScript que consume la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com): listado de usuarios con búsqueda, publicaciones por usuario y creación simulada de posts con validación de formulario.

## Requisitos

- Node.js 20 o superior
- npm 10+

## Cómo ejecutarlo

```bash
npm install
npm run dev      # interfaz en http://localhost:5173
npm test         # tests con Vitest y Testing Library
npm run build    # compilación de producción
npm run preview  # vista previa del build
```

## Funcionalidad

1. **Usuarios** — Carga desde `GET /users`, búsqueda local por nombre (sin distinguir mayúsculas) y selección en un panel lateral.
2. **Publicaciones** — Al elegir un usuario, `GET /posts?userId={id}` con indicadores de carga y error con opción de reintentar.
3. **Nueva publicación** — Formulario con título y texto obligatorios; `POST /posts` devuelve el objeto creado y la UI lo muestra **al inicio** de la lista (la API no persiste datos; es comportamiento esperado de JSONPlaceholder).

## Decisiones técnicas

- **Vite + React 19 + TypeScript** — Herramienta rápida y tipado estricto en modelos de dominio (`User`, `Post`).
- **Tailwind CSS v4** (plugin de Vite) — Estilos sin librería de componentes, layout responsivo en dos columnas (apilado en móvil).
- **Sin enrutador** — Estado `selectedUserId` en `App`; suficiente para el alcance de la prueba.
- **Capa `src/api/client.ts`** — `fetch` centralizado, `ApiError` y mensajes de red legibles.
- **Hooks** (`useUsers`, `usePosts`, `useCreatePost`) — Encapsulan carga, error y reintento; `prependPost` actualiza la lista tras un POST exitoso.
- **Búsqueda en cliente** — La API no ofrece filtrado por nombre; se evita lógica innecesaria en el servidor de prueba.

## Qué haría con más tiempo

- Cacheo y revalidación con TanStack Query o SWR.
- MSW para pruebas e2e y desarrollo sin red.
- Rutas por usuario (`/users/:id`) y enlaces compartibles.
- CI (GitHub Actions) con `test` y `build`.
- Auditoría de accesibilidad (focus trap, live regions) y modo oscuro coherente.
- Paginación o virtualización si el volumen de posts creciera.

## Uso de herramientas de IA

Durante el desarrollo se usó asistencia de IA (Cursor) de forma acotada al código del repositorio:

| Área | Asistencia | Revisión manual del autor |
|------|------------|---------------------------|
| Scaffold del proyecto | Plantilla Vite, dependencias sugeridas | Elección de Vite, Tailwind v4 y Vitest; eliminación del boilerplate por defecto |
| Estructura y hooks | Borrador de organización de carpetas | Definición final de `ApiError`, reintentos y `prependPost` |
| Componentes UI | Clases Tailwind y layout | Textos en español, accesibilidad (`aria-*`, estados de error) y flujo master-detail |
| Tests | Esqueleto de pruebas con Testing Library | Ajuste del test de validación con `fireEvent.submit` (botón deshabilitado si hay campos vacíos) |
| README | Esquema de secciones | Redacción final de decisiones y límites de la API |

No se incorporaron fragmentos sin revisar: la validación del formulario, el manejo de errores de red y los asserts de los tests se comprobaron ejecutando `npm test` y `npm run build` en local.

## Tiempo de desarrollo

Aproximadamente **3 horas** (scaffold, implementación, tests, README y publicación).

## Licencia

MIT — uso libre para fines de evaluación técnica.
