import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "~/lib/utils";

export function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        safeValue === 100
          ? "bg-green-500 animate-success-pulse relative h-2 w-full overflow-hidden rounded-full"
          : "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          safeValue === 100
            ? "bg-green-500 animate-success-bar h-full w-full flex-1 transition-all"
            : safeValue >= 78
            ? "bg-green-500 h-full w-full flex-1 transition-all"
            : safeValue >= 30
            ? "bg-yellow-400 h-full w-full flex-1 transition-all"
            : "bg-red-500 h-full w-full flex-1 transition-all"
        )}
        style={{ transform: `translateX(-${100 - safeValue}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
