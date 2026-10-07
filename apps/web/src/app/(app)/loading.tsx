export default function Loading() {
  return (
    <div className="flex min-h-full items-center justify-center">
      <div role="status" className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="border-foreground/20 border-t-foreground size-6 animate-spin rounded-full border-2"
        />
        <span className="sr-only">Chargement…</span>
      </div>
    </div>
  );
}
