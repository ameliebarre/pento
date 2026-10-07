"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";

import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function Radio({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(
        "border-input focus-visible:border-ring focus-visible:ring-ring/50 data-checked:border-primary dark:bg-input/30 relative flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-indicator"
        className="bg-primary data-unchecked:hidden size-2 rounded-full"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, Radio };
