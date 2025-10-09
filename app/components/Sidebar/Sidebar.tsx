import { ChevronLeft, CircleUser, LayoutDashboardIcon } from 'lucide-react'
import SidebarItem from './SidebarItem'
import { useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

type ISidebarList = {
  titleMenu: string
  menu: {
    href: string
    icon: ReactNode
    label: string
  }[]
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  const sidebarList: ISidebarList[] = [
    {
      titleMenu: 'Dashboard',
      menu: [
        {
          href: '/',
          icon: <LayoutDashboardIcon />,
          label: 'Dashboard',
        },
      ],
    },
    {
      titleMenu: 'Account',
      menu: [
        {
          href: '/account/simple-sign-in',
          icon: <CircleUser />,
          label: 'Simple Sign In',
        },
      ],
    },
  ]

  return (
    <aside
      className={[
        'hidden md:flex md:flex-col md:shrink-0 h-screen',
        'border-r border-[var(--color-sidebar-border)]',
        'bg-white text-[var(--color-sidebar-foreground)]',
        'transition-all duration-300 ease-in-out will-change-[width]',
        collapsed ? 'w-20 -ml-2' : 'w-64',
      ].join(' ')}
      aria-label="Primary"
      data-collapsed={collapsed}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-3 py-4">
        <Link
          to={{ pathname: '/' }}
          className="flex items-center  gap-2 rounded-md px-2 py-1.5 hover:bg-[var(--color-sidebar-accent)]"
        >
          <div
            className="size-6 rounded-md bg-[var(--color-sidebar-primary)]"
            aria-hidden="true"
          />
          <span
            className={[
              'text-sm font-semibold origin-left transition-all ease-in-out',
              collapsed
                ? 'opacity-0 -translate-x-2 w-0  overflow-hidden'
                : 'opacity-100 translate-x-0 w-auto',
            ].join(' ')}
            aria-hidden={collapsed}
          >
            Membership
          </span>
        </Link>

        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="inline-flex size-8 cursor-pointer rounded-full absolute -left-1 bg-white z-20 items-center justify-center border border-[var(--color-sidebar-border)] hover:bg-[var(--color-sidebar-accent)]"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
            aria-live="polite"
          >
            <ChevronLeft
              className={[
                'size-4 transition-transform duration-300 ease-in-out',
                collapsed ? 'rotate-180' : 'rotate-0',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 pb-4" role="navigation" aria-label="Main navigation">
        {sidebarList.map((parent) => (
          <div className="mb-5 px-4" key={parent.titleMenu}>
            <div className="mb-2">
              <p
                className={[
                  'text-sm font-b text-[var(--muted-foreground)] origin-left transition-all duration-300 ease-in-out',
                  collapsed
                    ? 'opacity-0 -translate-x-2 w-0 overflow-hidden'
                    : 'opacity-100 translate-x-0 w-auto',
                ].join(' ')}
                aria-hidden={collapsed}
              >
                {parent.titleMenu}
              </p>
            </div>
            {parent.menu.map((menu) => (
              <ul key={menu.href} className="space-y-1">
                <li>
                  <SidebarItem
                    href={menu.href}
                    icon={menu.icon}
                    label={menu.label}
                    active={pathname === menu.href}
                    collapsed={collapsed}
                  />
                </li>
              </ul>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-3">
        <div
          className={[
            'rounded-md border border-[var(--color-sidebar-border)]',
            'bg-[var(--color-sidebar-accent)]',
            'px-3 py-2',
          ].join(' ')}
        >
          <p
            className={[
              'text-xs origin-left transition-all duration-300 ease-in-out',
              collapsed
                ? 'opacity-0 -translate-x-2 w-0 overflow-hidden'
                : 'opacity-100 translate-x-0 w-auto',
            ].join(' ')}
            aria-hidden={collapsed}
          >
            Signed in as{' '}
            <span className="ml-1 font-medium">you@example.com</span>
          </p>
          {collapsed && <span className="sr-only">Signed in</span>}
        </div>
      </div>
    </aside>
  )
}
