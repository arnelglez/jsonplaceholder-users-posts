# Architecture

Alineado con la regla global **arch-react** (feature-first, Zustand, Zod, `http()`).

## Layout

```
src/
├── app/                    # Shell / composition root
├── core/
│   ├── network/            # httpClient + HttpRequestError
│   ├── security/           # Allowlists, parsers, offensive tests
│   ├── lib/                # userHue, utilidades
│   └── ui/                 # Spinner, alerts, avatar
└── features/
    ├── users/
    │   ├── domain/types.ts
    │   ├── data/api/users.api.ts
    │   ├── data/hooks/useUsers.ts
    │   ├── data/store/directory.store.ts   # Zustand: selectedUserId
    │   └── ui/components/UserList.tsx
    └── posts/
        ├── domain/types.ts
        ├── domain/schemas/post.schema.ts   # Zod + react-hook-form
        ├── data/api/posts.api.ts
        ├── data/hooks/usePosts.ts, useCreatePost.ts
        ├── data/store/postsUi.store.ts
        └── ui/components/PostList.tsx, CreatePostForm.tsx
```

## Convenciones

- **HTTP:** `core/network/httpClient.ts` → `VITE_API_URL` (ver `.env.example`).
- **Estado:** Zustand por feature (`directory.store`, `postsUi.store`); datos remotos en hooks.
- **Formularios:** `react-hook-form` + `zodResolver` + esquema en `domain/schemas/`.
- **Seguridad:** parsers en `core/security/validation.ts` antes de renderizar.

## Rutas (React Router 7)

| Ruta | Vista |
|------|--------|
| `/` | Landing pública |
| `/login` | Login demo (`admin` / `admin`, solo cliente) |
| `/app` | Panel: placeholder desktop / lista en móvil |
| `/app/users/:userId/posts` | Publicaciones y formulario (`userId` en URL) |
| `*` | 404 — página no encontrada |

Configuración: `app/router.tsx` + `RouterProvider` en `main.tsx`.

## Nota

El create de post sigue en la misma página de publicaciones (no ruta `/new` aparte) para acotar el alcance de la prueba; encaja con el listado + formulario del enunciado.
