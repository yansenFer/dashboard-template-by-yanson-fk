import * as React from 'react'
import { useSelector } from 'react-redux'

import { cn } from '~/lib/utils'
import type { RootState } from '~/store/store'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `${isDark ? 'bg-dark' : 'bg-white'} border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus:border-none flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
