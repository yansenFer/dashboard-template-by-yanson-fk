import { ChevronDown, LogOut, Settings, UserPen, LifeBuoy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";

export default function ProfileDropdown() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark rounded-full"></div>
          </div>
          <div className="hidden md:flex flex-col items-start text-left">
            <p
              className={`text-sm font-semibold leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Yanson
            </p>
            <p className="text-[11px] text-slate-500 font-medium">Admin</p>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 group-data-[state=open]:rotate-180 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-64 mt-2 p-2 shadow-xl ${
          isDark
            ? "bg-[#1e293b] border-slate-700 text-slate-200"
            : "bg-white border-slate-200 text-slate-900"
        }`}
        align="end"
      >
        <DropdownMenuLabel className="font-normal p-3">
          <div className="flex flex-col space-y-1">
            <p
              className={`text-sm font-bold leading-none ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Yanson Ferdinand K
            </p>
            <p
              className={`text-xs leading-none pt-1 ${isDark ? "text-slate-400" : "text-muted-foreground"}`}
            >
              yanson@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator
          className={`mx-[-8px] my-2 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}
        />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={`cursor-pointer py-2.5 rounded-lg transition-colors ${
              isDark
                ? "focus:bg-slate-700 focus:text-white"
                : "focus:bg-slate-100 focus:text-primary"
            }`}
          >
            <UserPen className="mr-3 size-4" />
            <span className="font-medium">Edit profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer py-2.5 rounded-lg transition-colors ${
              isDark
                ? "focus:bg-slate-700 focus:text-white"
                : "focus:bg-slate-100 focus:text-primary"
            }`}
          >
            <Settings className="mr-3 size-4" />
            <span className="font-medium">Account settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`cursor-pointer py-2.5 rounded-lg transition-colors ${
              isDark
                ? "focus:bg-slate-700 focus:text-white"
                : "focus:bg-slate-100 focus:text-primary"
            }`}
          >
            <LifeBuoy className="mr-3 size-4" />
            <span className="font-medium">Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator
          className={`mx-[-8px] my-2 ${isDark ? "bg-slate-700" : "bg-slate-100"}`}
        />
        <DropdownMenuItem
          className={`cursor-pointer py-2.5 rounded-lg text-destructive transition-colors ${
            isDark
              ? "focus:bg-destructive/20 focus:text-red-400"
              : "focus:bg-destructive/10 focus:text-destructive"
          }`}
        >
          <LogOut className="mr-3 size-4" />
          <span className="font-medium">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
