import { ChevronLeft } from 'lucide-react'
import SidebarItem from './SidebarItem'
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { sidebarList } from '~/constants/sidebarList'
import { useSelector } from 'react-redux'
import type { RootState } from '~/store/store'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const isDark = useSelector((state: RootState) => state.dark.isDark)
  const pathname = location.pathname

  return (
    <aside
      className={[
        'hidden md:flex md:flex-col md:shrink-0 h-screen transition-all duration-300',
        `${isDark ? 'bg-dark text-white border-transparent' : 'bg-white text-black border-gray-300'} border-r text-[var(--color-sidebar-foreground)]`,
        'will-change-[width]',
        collapsed ? 'w-20 -ml-2' : 'w-64',
      ].join(' ')}
      aria-label="Primary"
      data-collapsed={collapsed}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-3 py-4">
        <Link
          to={{ pathname: '/' }}
          className="flex items-center gap-2 rounded-md px-2"
        >
          {collapsed ? (
            <span className="font-extrabold py-2 w-full text-center">YnB</span>
          ) : isDark ? (
            <img
              className="h-10"
              alt="logo dark mode"
              src="/YnB_template_specialist_dark_mode.png"
            />
          ) : (
            <img
              className="h-10"
              alt="logo light mode"
              src="/YnB_template_specialist_light_mode.png"
            />
          )}
        </Link>

        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className={`inline-flex size-8 cursor-pointer rounded-full absolute -left-1  z-20 items-center justify-center border  ${isDark ? 'bg-dark border-dark' : 'bg-white border-gray-300'}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand' : 'Collapse'}
            aria-live="polite"
          >
            <ChevronLeft
              className={[
                'size-4 transition-transform duration-300 ease-in-out',
                collapsed ? 'rotate-180' : 'rotate-0',
              ].join(' ')}
              color={isDark ? 'white' : 'black'}
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
                  `${isDark ? 'text-white' : 'text-[var(--muted-foreground)]'} transition-all duration-300 text-sm font-b  origin-left  ease-in-out`,
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
              <ul key={menu.href} className="space-y-1 mb-2">
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
      {!collapsed && (
        <div className="mt-auto p-3">
          <div
            className={[
              `rounded-md border ${isDark ? 'border-dark' : 'border-light'}`,
              `${isDark ? 'input-dark' : 'bg-[var(--color-sidebar-accent)]'} `,
              'px-3 py-2',
            ].join(' ')}
          >
            <p
              className={[
                'text-xs origin-left  ease-in-out',
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
      )}
    </aside>
  )
}
