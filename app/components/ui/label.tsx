import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "~/lib/utils";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        ` ${isDark ? `text-white` : `text-slate-900`} `,
        className,
      )}
      {...props}
    />
  );
}

export { Label };
