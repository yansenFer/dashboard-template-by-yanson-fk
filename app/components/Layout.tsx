import type React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import type { RootState } from '~/store/store'

type LayoutProps = {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const isDark = useSelector((state: RootState) => state.dark.isDark)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex max-h-screen overflow-auto">
        <Sidebar />
        <div className="flex-1 flex flex-col max-h-screen overflow-auto relative">
          <Header />
          <div
            className={`p-5 justify-center flex flex-1 ${isDark ? 'bg-content-dark' : 'bg-content-background'}`}
          >
            <div className="w-[1920px] justify-center">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
