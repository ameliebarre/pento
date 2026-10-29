import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 pt-32 pb-16" aria-hidden="true">
      <span className="sr-only" role="status">
        Chargement des produits…
      </span>

      <header className="border-border/60 absolute top-0 right-0 left-0 z-10 border-b bg-white">
        <div className="mx-auto flex h-18 items-center justify-between px-4 sm:px-8 md:px-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="size-9 rounded-full" />
        </div>
      </header>

      <Skeleton className="h-5 w-36" />

      <div className="flex flex-1 flex-col gap-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
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
