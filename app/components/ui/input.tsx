import * as React from 'react'
import { useSelector } from 'react-redux'

import { cn } from '~/lib/utils'
import type { RootState } from '~/store/store'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)

  return (
    <input
      type={type}
      data-slot="input"
      data-border={isDark ? 'orange-dark-500' : 'orange-500'}
      className={cn(
        'focus:ring-1 focus:ring-orange-500 focus:border-orange-500 file:text-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        `${isDark ? 'input-dark' : 'input-light border-input'}`,
        className
      )}
      {...props}
    />
  )
}

export { Input }
