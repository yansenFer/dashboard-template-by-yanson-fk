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
        'focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-300 ease-in-out',
        `${isDark ? 'input-dark' : 'input-light border-input'}`,
        'flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
