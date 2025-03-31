import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface YellowGreenButtonProps extends ButtonProps {}

const YellowGreenButton = React.forwardRef<
  HTMLButtonElement,
  YellowGreenButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      className={cn(
        "bg-yellow-400 text-green-600 hover:bg-yellow-500 font-semibold",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});

YellowGreenButton.displayName = "YellowGreenButton";

export { YellowGreenButton };
