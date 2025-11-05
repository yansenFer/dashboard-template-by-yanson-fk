import type { ISidebarList } from '~/interfaces/ISidebarList'
import {
  BookCopy,
  CircleUser,
  FormInput,
  HomeIcon,
  LayoutDashboardIcon,
} from 'lucide-react'

export const sidebarList: ISidebarList[] = [
  {
    titleMenu: 'Dashboard',
    menu: [
      {
        href: '/',
        icon: <HomeIcon />,
        label: 'Overview',
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
      {
        href: '/form/form-layout',
        icon: <BookCopy />,
        label: 'Form Layout',
      },
    ],
  },
]
