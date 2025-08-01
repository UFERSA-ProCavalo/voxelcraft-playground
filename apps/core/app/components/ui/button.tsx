import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 focus:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent focus:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

import { useSoundStore } from "../../store/soundStore";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    suppressClickSound?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const playSound = useSoundStore((s) => s.playSound);
  // Armazena a última vez que o som de hover foi tocado
  const lastPlayedRef = React.useRef<number>(0);
  const SOUND_THROTTLE_MS = 400;

  const playHoverSound = () => {
    const now = Date.now();
    if (now - lastPlayedRef.current > SOUND_THROTTLE_MS) {
      playSound("hover");
      lastPlayedRef.current = now;
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHoverSound();
    e.currentTarget.classList.add("wobble-hover");
    if (props.onMouseEnter) props.onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.remove("wobble-hover");
    if (props.onMouseLeave) props.onMouseLeave(e);
  };


  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget && e.currentTarget.matches(":focus-visible")) {
      playHoverSound();
      e.currentTarget.classList.add("wobble-hover");
    }
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget) {
      e.currentTarget.classList.remove("wobble-hover");
    }
    if (props.onBlur) props.onBlur(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.suppressClickSound) {
      playSound("click");
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <Comp
      data-slot="button"
      className={cn(
        "focus-visible:wobble-hover",
        buttonVariants({ variant, size, className })
      )}
      {...props}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export { Button, buttonVariants };
