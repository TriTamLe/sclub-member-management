"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/styles/";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const SCTooltip = (props: {
  children: React.ReactNode;
  title: React.ReactNode;
  className?: string;
  delay?: number;
  defaultOpen?: boolean;
  disableHoverableContent?: boolean;
  key?: string;
  open?: boolean;
  onOpenChange?: TooltipPrimitive.TooltipProps["onOpenChange"];
}) => {
  return (
    <TooltipProvider>
      <Tooltip
        delayDuration={props.delay}
        defaultOpen={props.defaultOpen}
        disableHoverableContent={props.disableHoverableContent}
        key={props.key}
        open={props.open}
        onOpenChange={props.onOpenChange}
      >
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent className={props.className}>
          {props.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { SCTooltip, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
