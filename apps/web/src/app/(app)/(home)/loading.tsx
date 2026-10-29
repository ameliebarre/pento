import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <span className="sr-only" role="status">
        Chargement de la page d&apos;accueil…
      </span>

      <section className="relative right-1/2 left-1/2 mx-[-50vw] min-h-svh w-screen overflow-hidden">
        <Skeleton className="absolute inset-0 rounded-none" />
        <div className="relative flex min-h-svh w-full items-center justify-center px-4 pt-28 pb-16 sm:px-8 md:justify-start md:px-12 lg:px-16">
          <div className="flex w-full max-w-md flex-col items-center gap-6 md:items-start">
            <Skeleton className="h-3 w-24 bg-white/30" />
            <Skeleton className="h-14 w-full bg-white/30" />
            <Skeleton className="h-4 w-4/5 bg-white/30" />
            <Skeleton className="h-11 w-36 bg-white/30" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-80" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:aspect-3/2 lg:grid-cols-3 lg:grid-rows-3 lg:gap-6">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              className={
                index === 0 || index === 3
                  ? "aspect-4/3 lg:row-span-2 lg:aspect-auto lg:h-full"
                  : "aspect-4/3 lg:aspect-auto lg:h-full"
              }
            />
          ))}
        </div>
      </section>

      <section className="bg-dull-white relative right-1/2 left-1/2 mx-[-50vw] flex w-screen flex-col gap-10 py-16 sm:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-2 px-6">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-4 gap-y-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Skeleton className="aspect-5/6 w-full" />
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink relative right-1/2 left-1/2 mx-[-50vw] w-screen">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          <div className="w-full py-17 md:h-full">
            <Skeleton className="aspect-642/695 h-full w-full bg-white/10 md:aspect-auto" />
          </div>
          <div className="flex flex-col justify-center gap-6 px-6 py-16 md:px-12">
            <Skeleton className="h-3 w-28 bg-white/10" />
            <Skeleton className="h-8 w-64 bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10" />
            <Skeleton className="h-4 w-5/6 bg-white/10" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24 bg-white/10" />
                  <Skeleton className="h-3 w-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8 py-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="aspect-3/4 w-full" />
          ))}
        </div>
      </section>

      <section className="bg-dull-white relative right-1/2 left-1/2 mx-[-50vw] flex w-screen flex-col gap-10 py-16 sm:py-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-2 px-6">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-72" />
        </div>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-56 w-full" />
          ))}
        </div>
      </section>

      <section className="relative right-1/2 left-1/2 mx-[-50vw] w-screen">
        <div className="flex min-h-152 w-full items-center justify-center py-16 sm:py-20">
          <div className="flex w-full max-w-xl flex-col items-center gap-6 px-6">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
