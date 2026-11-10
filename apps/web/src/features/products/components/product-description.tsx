"use client";

import { useEffect, useRef, useState } from "react";

type ProductDescriptionProps = {
  description: string;
};

export function ProductDescription({ description }: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [description]);

  return (
    <div className="flex flex-col gap-2">
      <p
        ref={textRef}
        className={`text-muted-foreground text-sm whitespace-pre-line ${expanded ? "" : "line-clamp-5"}`}
      >
        {description}
      </p>
      {(isClamped || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="text-ink w-fit cursor-pointer text-sm underline underline-offset-2"
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
}
