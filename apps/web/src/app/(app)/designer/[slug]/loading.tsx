import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-16 pt-32 pb-16" aria-hidden="true">
      <span className="sr-only" role="status">
        Chargement de la page designer…
      </span>

      <header className="border-border/60 absolute top-0 right-0 left-0 z-10 border-b bg-white">
        <div className="mx-auto flex h-18 items-center justify-between px-4 sm:px-8 md:px-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="size-9 rounded-full" />
        </div>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>

          <Skeleton className="h-4 w-32" />

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-20" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Skeleton className="h-11 w-44" />
        </div>

        <Skeleton className="aspect-3/4 w-full lg:w-1/2" />
      </div>

      <div className="bg-dull-white relative right-1/2 left-1/2 mx-[-50vw] w-screen py-8">
        <div className="flex flex-wrap items-center justify-center gap-18.75">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-24" />
          ))}
        </div>
      </div>

      <div className="bg-ink relative right-1/2 left-1/2 mx-[-50vw] w-screen py-15.5">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6">
          <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
          <Skeleton className="h-8 w-full bg-white/10" />
          <Skeleton className="h-8 w-2/3 bg-white/10" />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-square w-full" />
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dull-white relative right-1/2 left-1/2 mx-[-50vw] w-screen py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-8 w-56" />
          </div>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <Skeleton className="aspect-4/3 w-full" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-8 w-72" />
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-3/4 w-full" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-8 w-60" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-square w-full" />
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
