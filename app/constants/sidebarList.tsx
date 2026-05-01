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
  Info,
  DollarSign,
  MessageCircle,
  Calendar,
  Mail,
  Contact,
  Cpu,
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
      {
        href: "/dashboards/ai",
        icon: <Cpu />,
        label: "AI Dashboard",
      },
    ],
  },
  {
    titleMenu: "Apps",
    menu: [
      {
        href: "/apps/chat",
        icon: <MessageCircle />,
        label: "Chat",
      },
      {
        href: "/apps/calendar",
        icon: <Calendar />,
        label: "Calendar",
      },
      {
        href: "/apps/email",
        icon: <Mail />,
        label: "Email",
      },
      {
        href: "/apps/contact-list",
        icon: <Contact />,
        label: "Contact List",
      },
      {
        href: "/apps/file-manager-list",
        icon: <FileText />,
        label: "File Manager List",
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
      {
        href: "/pages-template/faq",
        icon: <Info />,
        label: "FAQ",
      },
      {
        href: "/pages-template/pricing",
        icon: <DollarSign />,
        label: "Pricing",
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
