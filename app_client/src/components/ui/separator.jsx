import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "../../lib/utils"

/**
 * Separator component for visual content separation
 * 
 * @component
 * @example
 * <div>Content above</div>
 * <Separator />
 * <div>Content below</div>
 * 
 * <div className="flex items-center space-x-4">
 *   <span>Item 1</span>
 *   <Separator orientation="vertical" className="h-4" />
 *   <span>Item 2</span>
 * </div>
 */

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }