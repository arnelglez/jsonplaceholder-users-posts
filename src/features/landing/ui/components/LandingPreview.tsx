/** Decorative panel — not live data. */
export function LandingPreview() {
  const users = [
    { name: 'Leanne Graham', active: true },
    { name: 'Ervin Howell', active: false },
    { name: 'Clementine DuBuque', active: false },
  ]

  return (
    <div
      className="landing-preview anim-panel-in relative mx-auto w-full max-w-md lg:max-w-none"
      aria-hidden
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-[0_24px_48px_rgb(15_23_42/0.08)]">
        <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#f87171]" />
          <span className="size-2.5 rounded-full bg-[#fbbf24]" />
          <span className="size-2.5 rounded-full bg-[#34d399]" />
          <span className="ml-2 truncate text-xs text-ink-faint">jsonplaceholder.typicode.com</span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[9rem_1fr]">
          <div className="border-b border-line bg-paper p-3 sm:border-b-0 sm:border-r">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
              Usuarios
            </p>
            <ul className="space-y-1.5">
              {users.map((u) => (
                <li
                  key={u.name}
                  className={`truncate rounded-md px-2 py-1.5 text-xs ${
                    u.active
                      ? 'bg-accent-soft font-medium text-accent'
                      : 'text-ink-muted'
                  }`}
                >
                  {u.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                LG
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">Leanne Graham</p>
                <p className="truncate text-xs text-ink-faint">leanne@example.com</p>
              </div>
            </div>
            <div className="space-y-2">
              <PreviewPostRow title="sunt aut facere" body="Quia et suscipit…" />
              <PreviewPostRow title="qui est esse" body="Est rerum tempore…" highlight />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewPostRow({
  title,
  body,
  highlight,
}: {
  title: string
  body: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 ${
        highlight ? 'border-accent/30 bg-accent-soft/50' : 'border-line bg-paper'
      }`}
    >
      <p className="text-xs font-medium text-ink">{title}</p>
      <p className="mt-0.5 text-[11px] text-ink-muted">{body}</p>
    </div>
  )
}
