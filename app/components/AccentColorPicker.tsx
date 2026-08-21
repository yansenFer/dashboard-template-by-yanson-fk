import { Palette, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import type { RootState } from "~/store/store";
import {
  ACCENT_COLORS,
  setAccentColor,
  type AccentColorId,
} from "~/store/features/accentColor/accentColorSlice";

export default function AccentColorPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const activeColor = useSelector(
    (state: RootState) => state.accentColor.color,
  );
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const value = ACCENT_COLORS[activeColor].value;
    const root = document.documentElement.style;
    root.setProperty("--primary", value);
    root.setProperty("--accent", value);
    root.setProperty("--ring", value);
    root.setProperty("--sidebar-primary", value);
    root.setProperty("--sidebar-ring", value);
    root.setProperty("--chart-1", value);
  }, [activeColor]);

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
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute bottom-16 right-0 w-56 rounded-xl border p-4 shadow-xl ${
              isDark
                ? "bg-dark border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <p
              className={`mb-3 text-sm font-semibold ${isDark ? "text-white" : "text-slate-800"}`}
            >
              Accent Color
            </p>
            <div className="grid grid-cols-4 gap-3">
              {(Object.keys(ACCENT_COLORS) as AccentColorId[]).map((id) => {
                const swatch = ACCENT_COLORS[id];
                const isActive = id === activeColor;
                return (
                  <button
                    key={id}
                    type="button"
                    title={swatch.label}
                    aria-label={swatch.label}
                    onClick={() => dispatch(setAccentColor(id))}
                    className="flex flex-col items-center gap-1"
                  >
                    <span
                      className={`flex size-8 items-center justify-center rounded-full ring-offset-2 transition-all ${
                        isActive
                          ? isDark
                            ? "ring-2 ring-white ring-offset-slate-900"
                            : "ring-2 ring-slate-800 ring-offset-white"
                          : ""
                      }`}
                      style={{ backgroundColor: swatch.value }}
                    >
                      {isActive && (
                        <Check className="size-4 text-white" strokeWidth={3} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Change accent color"
        title="Change accent color"
        className={`flex size-12 cursor-pointer items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105 ${
          isDark
            ? "bg-dark border-slate-700 text-white"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        <Palette className="size-5" style={{ color: "var(--primary)" }} />
      </button>
    </div>
  );
}
