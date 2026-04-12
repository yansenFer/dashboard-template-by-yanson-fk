import { ChevronLeft, ChevronDown } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { sidebarList } from "~/constants/sidebarList";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sidebarList.map((item) => item.titleMenu),
  );
  const location = useLocation();
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const pathname = location.pathname;

  const toggleSection = (title: string) => {
    if (collapsed) return;
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <aside
      className={[
        "hidden md:flex md:flex-col md:shrink-0 h-screen transition-all duration-300",
        `${isDark ? "bg-dark text-white border-transparent" : "bg-white text-black border-slate-200"} border-r text-[var(--color-sidebar-foreground)]`,
        "will-change-[width]",
        collapsed ? "w-20 -ml-2" : "w-64",
      ].join(" ")}
      aria-label="Primary"
      data-collapsed={collapsed}
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between px-3 py-4">
        <Link
          to={{ pathname: "/" }}
          className="flex items-center gap-2 w-full rounded-md px-2"
        >
          {collapsed ? (
            <span className="font-black py-2 w-full text-center text-xl bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-orange-600">
              Gv
            </span>
          ) : (
            <div className="flex items-center gap-2 py-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 text-white font-black text-lg shadow-md">
                Gv
              </div>
              <span
                className={[
                  "font-extrabold text-2xl tracking-tight",
                  isDark ? "text-white" : "text-slate-900",
                ].join(" ")}
              >
                Gvixer
              </span>
            </div>
          )}
        </Link>

        <div className="flex items-center gap-2 relative">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className={`inline-flex size-8 cursor-pointer rounded-full absolute -left-1  z-50 items-center justify-center border  ${isDark ? "bg-dark border-dark" : "bg-white border-slate-200"}`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand" : "Collapse"}
            aria-live="polite"
          >
            <ChevronLeft
              className={[
                "size-4 transition-transform duration-300 ease-in-out",
                collapsed ? "rotate-180" : "rotate-0",
              ].join(" ")}
              color={isDark ? "white" : "black"}
            />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`px-2 pb-4 no-scrollbar flex-1 relative z-10 ${collapsed ? "overflow-y-visible" : "overflow-y-auto"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {collapsed ? (
          <div className="flex flex-col gap-1">
            {sidebarList
              .flatMap((parent) => parent.menu)
              .map((menu) => (
                <SidebarItem
                  key={menu.href}
                  href={menu.href}
                  icon={menu.icon}
                  label={menu.label}
                  active={pathname === menu.href}
                  collapsed={collapsed}
                />
              ))}
          </div>
        ) : (
          sidebarList.map((parent) => {
            const isExpanded = expandedSections.includes(parent.titleMenu);
            return (
              <div
                className="px-4 mb-1 transition-all duration-300"
                key={parent.titleMenu}
              >
                <button
                  onClick={() => toggleSection(parent.titleMenu)}
                  className="w-full flex items-center justify-between mb-1 group cursor-pointer"
                >
                  <p
                    className={`transition-all duration-300 text-sm font-bold origin-left ease-in-out ${isDark ? "text-white" : "text-[var(--muted-foreground)]"}`}
                  >
                    {parent.titleMenu}
                  </p>
                  <ChevronDown
                    className={`size-3 transition-transform duration-300 ${isDark ? "text-gray-400" : "text-gray-500"} ${isExpanded ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={{
                        expanded: { opacity: 1, height: "auto", marginTop: 0 },
                        collapsed: { opacity: 0, height: 0, marginTop: 0 },
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <ul className="mb-2 space-y-0.5">
                        {parent.menu.map((menu) => (
                          <li key={menu.href}>
                            <SidebarItem
                              href={menu.href}
                              icon={menu.icon}
                              label={menu.label}
                              active={pathname === menu.href}
                              collapsed={collapsed}
                            />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="mt-auto p-3">
          <div
            className={[
              `rounded-md border ${isDark ? "border-dark" : "border-light"}`,
              `${isDark ? "input-dark" : "bg-[var(--color-sidebar-accent)]"} `,
              "px-3 py-2",
            ].join(" ")}
          >
            <p
              className={[
                "text-xs origin-left  ease-in-out",
                collapsed
                  ? "opacity-0 -translate-x-2 w-0 overflow-hidden"
                  : "opacity-100 translate-x-0 w-auto",
              ].join(" ")}
              aria-hidden={collapsed}
            >
              Signed in as{" "}
              <span className="ml-1 font-medium">you@example.com</span>
            </p>
            {collapsed && <span className="sr-only">Signed in</span>}
          </div>
        </div>
      )}
    </aside>
  );
}
