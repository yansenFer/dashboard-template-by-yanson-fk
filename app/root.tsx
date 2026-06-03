import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { Provider, useSelector } from 'react-redux'
import { store, type RootState } from './store/store'
import { useEffect } from 'react'
import { cn } from './lib/utils'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>{children}</Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = '404'
  let title = 'Page Not Found'
  let details = 'The requested page could not be found or has been moved.'
  let stack: string | undefined

  let isDark = false;
  try {
    isDark = useSelector((state: RootState) => state.dark.isDark);
  } catch (e) {
    // Redux fallback
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  if (isRouteErrorResponse(error)) {
    if (error.status !== 404) {
      message = error.status.toString()
      title = error.statusText || 'Error occurred'
      details = 'An error occurred while trying to load the requested page.'
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    message = 'Error'
    title = error.name
    details = error.message
    stack = error.stack
  }

  return (
    <main className={cn(
      "flex flex-col items-center justify-center min-h-screen p-6 transition-colors duration-300",
      isDark ? "bg-[#0b1120] text-slate-100" : "bg-slate-50 text-slate-900"
    )}>
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-16 select-none">
        <svg
          className={cn(
            "w-8 h-8",
            isDark ? "text-slate-100" : "text-slate-800"
          )}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 24V16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16V24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 17H24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M9 26L23 6"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-semibold text-lg tracking-wider font-sans uppercase">
          Ferforge UI
        </span>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-md w-full flex flex-col items-center">
        {/* Large 404 Display */}
        <div className="relative mb-6 select-none w-full flex items-center justify-center h-28">
          <span className={cn(
            "text-8xl font-black tracking-tighter opacity-10 bg-gradient-to-b bg-clip-text text-transparent",
            isDark ? "from-slate-700 to-transparent" : "from-slate-400 to-transparent"
          )}>
            {message}
          </span>
          <span className={cn(
            "absolute inset-0 flex items-center justify-center text-6xl font-black tracking-tight",
            isDark ? "text-white" : "text-slate-950"
          )}>
            {message}
          </span>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight mb-3">
          {title}
        </h2>
        <p className={cn(
          "text-sm font-medium mb-8 leading-relaxed",
          isDark ? "text-slate-400" : "text-slate-500"
        )}>
          {details}
        </p>

        {/* Action Button */}
        <a
          href="/"
          className={cn(
            "inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-bold text-sm border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
            isDark 
              ? "border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-100" 
              : "border-slate-200 bg-white hover:bg-slate-100 text-slate-900 shadow-sm"
          )}
        >
          <span>Back to Dashboard</span>
        </a>

        {/* Stack Trace (only in development and for actual errors) */}
        {stack && (
          <div className="w-full mt-12 text-left">
            <p className="text-xs font-bold text-rose-500 mb-2 uppercase tracking-wider">
              Debug Stack Trace:
            </p>
            <pre className="p-4 bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px] rounded-xl overflow-x-auto max-h-48 w-full leading-normal">
              <code>{stack}</code>
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
