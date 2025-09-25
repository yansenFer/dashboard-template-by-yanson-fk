import type React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import { useLocation } from 'react-router'

type LayoutProps = {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex max-h-screen overflow-auto">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  )
}
