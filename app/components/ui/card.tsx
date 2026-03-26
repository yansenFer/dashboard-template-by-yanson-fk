import * as React from 'react'
import { useSelector } from 'react-redux'

import { cn } from '~/lib/utils'
import type { RootState } from '~/store/store'

function Card({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<'div'>>) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  return (
    <div
      data-slot="card"
      className={cn(
        `${isDark ? 'card-dark text-white border-transparent' : 'bg-card text-card-foreground border-transparent shadow-md'} flex flex-col gap-6 rounded-xl border pt-3 pb-6`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)

  return (
    <div
      data-slot="card-header"
      className={cn(
        `${isDark ? 'border-slate-800' : 'border-gray-300'} @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-3`,
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  return (
    <div
      data-slot="card-description"
      className={cn(
        `${isDark ? 'text-white' : 'text-muted-foreground'}  text-sm`,
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn(`px-6 `, className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
