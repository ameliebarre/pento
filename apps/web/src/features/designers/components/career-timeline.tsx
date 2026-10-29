"use client";

import { useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";

import type { DesignerTimelineEntry } from "@/features/products/medusa-types";

type CareerTimelineProps = {
  entries: DesignerTimelineEntry[];
};

export function CareerTimeline({ entries }: CareerTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({ startX: 0, startScrollLeft: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const measure = () => setIsScrollable(el.scrollWidth > el.clientWidth + 1);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [entries.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;

    dragStateRef.current = { startX: e.clientX, startScrollLeft: el.scrollLeft };
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDragging) return;

    const delta = e.clientX - dragStateRef.current.startX;
    el.scrollLeft = dragStateRef.current.startScrollLeft - delta;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    scrollRef.current?.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative right-1/2 left-1/2 mx-[-50vw] w-screen scrollbar-none overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        <div className="flex w-max">
          <div className="w-24 shrink-0" />

          {entries.map((entry, index) => (
            <div key={index} className="group relative flex w-55 shrink-0 flex-col items-center">
              <div className="flex flex-col items-center gap-y-0.75 pb-6 text-center">
                <p className="font-heading text-2xl text-ink">{entry.date}</p>
                <p className="text-xs text-[#96652E]">{entry.subtitle}</p>
                <p className="text-xs text-ink">{entry.title}</p>
              </div>

              <div className="flex w-full items-center">
                <span className="h-px flex-1 bg-ink/15" />
                <span className="size-4 shrink-0 rounded-full border border-ink/40 bg-white" />
                <span className="h-px flex-1 bg-ink/15" />
              </div>

              <div className="relative h-32 w-full">
                <p className="pointer-events-none absolute top-4 left-1/2 w-80 -translate-x-1/2 text-center text-xs text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}

          <div className="w-24 shrink-0" />
        </div>
      </div>

      {isScrollable && (
        <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
          <Hand aria-hidden="true" className="size-4" />
          Scroll to explore the full timeline
        </div>
      )}
    </div>
  );
}
