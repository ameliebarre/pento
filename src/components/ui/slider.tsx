"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

type SliderProps = Omit<SliderPrimitive.Root.Props<readonly number[]>, "children"> & {
  getAriaLabel?: (index: number) => string;
};

function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  getAriaLabel,
  ...props
}: SliderProps) {
  const values = value ?? defaultValue ?? [min, max];

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Control className="flex w-full items-center py-1">
        <SliderPrimitive.Track className="bg-muted relative h-1.5 w-full grow overflow-hidden rounded-full">
          <SliderPrimitive.Indicator className="bg-primary absolute h-full rounded-full" />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            aria-label={getAriaLabel?.(index)}
            className="border-primary bg-background block size-4 shrink-0 rounded-full border-2 shadow transition-[box-shadow] outline-none hover:ring-4 hover:ring-ring/20 focus-visible:ring-4 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
