import type React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

type LayoutProps = {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex max-h-screen overflow-auto">
        <Sidebar />
        <div className="flex-1 max-h-screen overflow-auto relative">
          <Header />
          <div className="p-5 justify-center flex">
            <div className="w-[1920px] justify-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
