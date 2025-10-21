import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '~/lib/utils'

type SidebarItemProps = {
  href?: string
  icon: ReactNode
  label: string
  active?: boolean
  badge?: string | number
  collapsed?: boolean
}

export default function SidebarItem({
  icon,
  label,
  active,
  badge,
  collapsed,
  href,
}: SidebarItemProps) {
  const content = (
    <div
      className={cn(
        'group flex items-center h-7 rounded-md px-2 transition-colors',
        // tighten spacing when collapsed so icon stays centered
        collapsed ? 'gap-0 justify-center pl-5' : 'gap-3 ml-2',
        'text-[var(--color-sidebar-foreground)] border-l-2 border-white hover:border-orange-600 rounded-none  hover:border-l-2 ',
        active && 'border-l-2 border-orange-600'
      )}
      title={collapsed ? label : undefined}
    >
      <span
        className={cn(
          'size-5 flex items-center  justify-center text-[var(--color-sidebar-foreground)]'
        )}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Animated label: slide+fade and collapse width */}
      <span
        className={cn(
          'text-xs font-medium origin-left transition-all duration-300 ease-in-out',
          collapsed
            ? 'opacity-0 -translate-x-2 w-0 overflow-hidden'
            : 'opacity-100 translate-x-0 w-auto'
        )}
        aria-hidden={collapsed}
      >
        {label}
      </span>

      {/* Animated badge: fade+scale and collapse width when sidebar collapsed */}
      {badge !== undefined && (
        <span
          className={cn(
            'ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs transition-all duration-300 ease-in-out',
            'bg-[var(--color-sidebar-primary)] text-[var(--color-sidebar-primary-foreground)]',
            collapsed
              ? 'opacity-0 scale-95 w-0 overflow-hidden ml-0'
              : 'opacity-100 scale-100 w-auto'
          )}
          aria-hidden={collapsed}
        >
          {badge}
        </span>
      )}
    </div>
  )

  return href ? (
    <Link to={{ pathname: href }} className="block">
      {content}
    </Link>
  ) : (
    content
  )
}
