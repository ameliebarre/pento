"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { TimelineEntry } from "@/features/designers/components/timeline-entry";
import type { DesignerTimelineEntry } from "@/features/products/medusa-types";

type TimelineRevealProps = {
  entries: DesignerTimelineEntry[];
  name: string;
};

export function TimelineReveal({ entries, name }: TimelineRevealProps) {
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const boundaryRef = useRef<HTMLDivElement>(null);

  const visibleCount = 4;
  const canCollapse = entries.length > visibleCount;

  useLayoutEffect(() => {
    if (!canCollapse || !boundaryRef.current || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      if (!boundaryRef.current) return;
      setCollapsedHeight(boundaryRef.current.offsetTop + boundaryRef.current.offsetHeight);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(boundaryRef.current);
    return () => observer.disconnect();
  }, [canCollapse, entries.length]);

  const isCollapsed = canCollapse && !expanded;

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={isCollapsed && collapsedHeight ? { maxHeight: collapsedHeight } : undefined}
      >
        <div className="relative flex flex-col gap-16 pt-4">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#26221B]/15 sm:block" />

          {entries.map((entry, index) => (
            <div
              key={index}
              ref={index === visibleCount - 1 ? boundaryRef : undefined}
              className="relative grid grid-cols-1 gap-x-12 sm:grid-cols-2"
            >
              <span className="ring-background absolute top-1 left-1/2 hidden size-2 -translate-x-1/2 rounded-full bg-[#c5964b] ring-4 sm:block" />
              <div className={index % 2 === 1 ? "sm:col-start-2" : undefined}>
                <TimelineEntry entry={entry} name={name} />
              </div>
            </div>
          ))}
        </div>

        {isCollapsed && (
          <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t to-transparent" />
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center pt-8">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 bg-[#c5964b] px-6 py-3 text-sm font-normal text-black uppercase"
          >
            View more
          </button>
        </div>
      )}
    </div>
  );
}
