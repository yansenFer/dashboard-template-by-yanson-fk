import { Coffee } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import type { RootState } from "~/store/store";

const OPTIONS = [
  {
    label: "Saweria",
    sub: "Indonesia",
    href: "https://saweria.co/yansenfer",
    flag: "🇮🇩",
  },
  {
    label: "Ko-fi",
    sub: "International",
    href: "https://ko-fi.com/yansenfer",
    flag: "🌍",
  },
];

export default function BuyMeACoffeeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 top-full mt-2 w-52 rounded-xl border p-2 shadow-xl ${
              isDark
                ? "bg-dark border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            {OPTIONS.map((option) => (
              <a
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                  isDark
                    ? "text-white hover:bg-slate-800"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{option.flag}</span>
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold">{option.label}</span>
                  <span
                    className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {option.sub}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full pill on tablet/desktop */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        title="Buy me a coffee"
        className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <Coffee className="size-4 shrink-0" />
        <span>Buy me a coffee</span>
      </button>

      {/* Icon-only on mobile */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Buy me a coffee"
        title="Buy me a coffee"
        className="sm:hidden inline-flex size-9 items-center justify-center rounded-full text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm"
      >
        <Coffee className="size-4 shrink-0" />
      </button>
    </div>
  );
}
