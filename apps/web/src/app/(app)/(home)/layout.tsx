import { Suspense } from "react";

import { SiteHeader } from "@/components/site-header";
import { Skeleton } from "@/components/ui/skeleton";

function SiteHeaderSkeleton() {
  return (
    <header className="border-border/60 absolute top-0 right-0 left-0 z-10 border-b bg-white">
      <div className="mx-auto flex h-18 items-center justify-between px-4 sm:px-8 md:px-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="size-9 rounded-full" />
      </div>
    </header>
  );
}

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<SiteHeaderSkeleton />}>
        <SiteHeader />
      </Suspense>
      {children}
    </>
  );
}
