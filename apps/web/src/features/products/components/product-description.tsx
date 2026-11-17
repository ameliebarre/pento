"use client";

import { useEffect, useRef, useState } from "react";

type ProductDescriptionProps = {
  description: string;
  onViewMore: () => void;
};

export function ProductDescription({ description, onViewMore }: ProductDescriptionProps) {
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [description]);

  return (
    <div className="flex flex-col gap-2">
      <p ref={textRef} className="text-muted-foreground line-clamp-5 text-sm whitespace-pre-line">
        {description}
      </p>
      {isClamped && (
        <button
          type="button"
          onClick={onViewMore}
          className="text-ink w-fit cursor-pointer text-sm underline underline-offset-2"
        >
          View more
        </button>
      )}
    </div>
  );
}
