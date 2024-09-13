"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const OrSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-muted-foreground",
      className
    )}
    {...props}
  >
    <Separator className="shrink" />
    <span className="whitespace-nowrap text-sm">or continue with</span>
    <Separator className="shrink" />
  </div>
));
OrSeparator.displayName = SeparatorPrimitive.Root.displayName;

export { OrSeparator };
