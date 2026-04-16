import type { ISidebarList } from "~/interfaces/ISidebarList";
import {
  BookCopy,
  CircleUser,
  FormInput,
  HomeIcon,
  UserPen,
  LogIn,
  FileText,
  Image,
  List,
} from "lucide-react";

export const sidebarList: ISidebarList[] = [
  {
    titleMenu: "Dashboard",
    menu: [
      {
        href: "/",
        icon: <HomeIcon />,
        label: "Overview",
      },
    ],
  },
  {
    titleMenu: "Pages",
    menu: [
      {
        href: "/pages-template/simple-sign-in",
        icon: <LogIn />,
        label: "Simple Sign In",
      },
      {
        href: "/pages-template/profile",
        icon: <CircleUser />,
        label: "Profile",
      },
      {
        href: "/pages-template/edit-profile",
        icon: <UserPen />,
        label: "Edit Profile",
      },
      {
        href: "/pages-template/invoice",
        icon: <FileText />,
        label: "Invoice",
      },
      {
        href: "/pages-template/gallery",
        icon: <Image />,
        label: "Gallery",
      },
      {
        href: "/pages-template/task-list",
        icon: <List />,
        label: "Task List",
      },
    ],
  },
  {
    titleMenu: "Form",
    menu: [
      {
        href: "/form/form-element",
        icon: <FormInput />,
        label: "Form Element",
      },
      {
        href: "/form/form-layout",
        icon: <BookCopy />,
        label: "Form Layout",
      },
    ],
  },
];
