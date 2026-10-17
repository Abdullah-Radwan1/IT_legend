function Skeleton({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded bg-gray-200 ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <div aria-busy="true">
      <span className="sr-only">Loading course...</span>

      <header className="bg-bg-light px-8 py-2 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="flex h-6 items-center gap-3"
        >
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-36" />
        </nav>
        <Skeleton className="my-2 h-10 w-3/4 max-w-2xl lg:h-12" />
      </header>

      <main className="min-h-dvh px-8 py-6 lg:px-12">
        <div className="flex flex-col gap-y-8 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start lg:gap-x-8">
          <div className="flex min-w-0 flex-col gap-6">
            <Skeleton className="aspect-video w-full rounded-sm" />

            <nav aria-hidden="true" className="flex gap-2 sm:gap-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 py-3"
                >
                  <Skeleton className="size-12 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                </div>
              ))}
            </nav>

            <section aria-hidden="true">
              <Skeleton className="mb-4 h-8 w-48" />
              <div className="rounded-sm bg-surface-card px-6 py-8 shadow-(--shadow-card)">
                <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                  {Array.from({ length: 8 }, (_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4 border-b border-gray-200 py-3"
                    >
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section aria-hidden="true" className="my-6">
              <Skeleton className="mb-6 h-8 w-36" />
              <ul className="mb-8 flex flex-col gap-5">
                {Array.from({ length: 3 }, (_, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 border-b border-gray-200 pb-5"
                  >
                    <Skeleton className="size-18 shrink-0 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2 px-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="mt-1 h-4 w-full max-w-lg" />
                      <Skeleton className="h-4 w-3/4 max-w-md" />
                    </div>
                  </li>
                ))}
              </ul>
              <Skeleton className="mb-4 h-36 w-full rounded" />
              <Skeleton className="h-12 w-36 rounded" />
            </section>
          </div>

          <aside
            aria-hidden="true"
            className="bg-surface-card lg:max-h-131.75 lg:rounded-lg"
          >
            <Skeleton className="mb-4 h-7 w-52" />
            <div className="mb-6 flex flex-col gap-3">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-3 w-40" />
            </div>

            <div className="flex flex-col gap-5 py-3">
              {Array.from({ length: 3 }, (_, sectionIndex) => (
                <section
                  key={sectionIndex}
                  className="border border-gray-200 px-6 pb-6"
                >
                  <div className="flex items-center justify-between pt-8 pb-4">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="size-5" />
                  </div>
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-5 h-4 w-3/4" />
                  <ul className="flex flex-col gap-2">
                    {Array.from({ length: 4 }, (_, lessonIndex) => (
                      <li
                        key={lessonIndex}
                        className="flex items-center gap-3 border-t border-gray-200 py-4"
                      >
                        <Skeleton className="size-5 shrink-0" />
                        <Skeleton
                          className={`h-4 ${
                            lessonIndex % 2 === 0 ? "w-3/4" : "w-1/2"
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
