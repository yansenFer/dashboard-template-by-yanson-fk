import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { cn } from "../../lib/utils";
import type { RootState } from "~/store/store";

type SidebarItemProps = {
  href?: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
  collapsed?: boolean;
};

export default function SidebarItem({
  icon,
  label,
  active,
  badge,
  collapsed,
  href,
}: SidebarItemProps) {
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  const content = (
    <div
      className={cn(
        "group flex items-center h-9 rounded-sm relative transition-none",
        // tighten spacing when collapsed so icon stays centered
        collapsed ? "justify-center px-0" : "gap-3 ml-2 px-2",
        `${isDark ? "text-white" : "text-[var(--color-sidebar-foreground)]"}`,
        // Hover & focus gradient — dark vs light
        isDark
          ? "hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-500 focus-within:bg-gradient-to-r focus-within:from-slate-800 focus-within:to-slate-500"
          : "hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-50 focus-within:bg-gradient-to-r focus-within:from-orange-600 focus-within:to-orange-100",
        isDark
          ? "hover:text-white focus-within:text-white transition-none"
          : "hover:text-white focus-within:text-white transition-none",
        // Active state gradient — dark vs light
        active &&
          (isDark
            ? "bg-gradient-to-r from-slate-800 to-slate-500 text-white transition-none"
            : "bg-gradient-to-r from-orange-600 to-orange-50 text-white transition-none"),
      )}
    >
      {/* Tooltip for collapsed mode */}
      {collapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1.5 rounded-md bg-slate-900 dark:bg-slate-800 text-white text-xs hidden group-hover:flex items-center transition-all duration-200 whitespace-nowrap z-[100] shadow-2xl pointer-events-none">
          <span className="relative z-10">{label}</span>
          {/* Tooltip arrow */}
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-slate-900 dark:border-r-slate-800" />
        </div>
      )}
      <span
        className={cn(
          "size-5 flex items-center justify-center",
          active
            ? "text-white"
            : isDark
              ? "text-white"
              : "text-[var(--color-sidebar-foreground)]",
          "group-hover:text-white !transition-none !duration-0 [&_*]:!transition-none [&_*]:!duration-0",
        )}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Animated label: slide+fade and collapse width */}
      <span
        className={cn(
          "text-xs font-medium origin-left transition-[opacity,transform,width] duration-300 ease-in-out",
          "group-hover:text-white group-focus-within:text-white group-hover:transition-none",
          collapsed
            ? "opacity-0 -translate-x-2 w-0 overflow-hidden"
            : "opacity-100 translate-x-0 w-auto",
        )}
        aria-hidden={collapsed}
      >
        {label}
      </span>

      {/* Animated badge: fade+scale and collapse width when sidebar collapsed */}
      {badge !== undefined && (
        <span
          className={cn(
            "ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs transition-all duration-300 ease-in-out",
            "bg-[var(--color-sidebar-primary)] text-[var(--color-sidebar-primary-foreground)]",
            collapsed
              ? "opacity-0 scale-95 w-0 overflow-hidden ml-0"
              : "opacity-100 scale-100 w-auto",
          )}
          aria-hidden={collapsed}
        >
          {badge}
        </span>
      )}
    </div>
  );

  return href ? (
    <Link to={{ pathname: href }} className="block">
      {content}
    </Link>
  ) : (
    content
  );
}
