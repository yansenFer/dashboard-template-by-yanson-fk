import type { ReactNode } from 'react'

export type ISidebarList = {
  titleMenu: string
  menu: {
    href: string
    icon: ReactNode
    label: string
  }[]
}
