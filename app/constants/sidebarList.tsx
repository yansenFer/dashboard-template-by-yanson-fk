import type { ISidebarList } from '~/interfaces/ISidebarList'
import { CircleUser, FormInput, LayoutDashboardIcon } from 'lucide-react'

export const sidebarList: ISidebarList[] = [
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
  {
    titleMenu: 'Form',
    menu: [
      {
        href: '/form/form-element',
        icon: <FormInput />,
        label: 'Form Element',
      },
    ],
  },
]
