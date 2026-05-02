import { Languages } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import { cn } from "~/lib/utils";

export default function LanguageSelector() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "bg-transparent relative border rounded-full transition-all duration-300",
            isDark
              ? "border-white/10 hover:border-white/30 hover:bg-white/5"
              : "border-black/10 hover:border-black/30 hover:bg-black/5",
          )}
          size="icon"
        >
          <Languages
            className={cn("w-5 h-5", isDark ? "text-white" : "text-slate-950")}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "w-48 mt-2 p-1 border-0 shadow-2xl rounded-2xl overflow-hidden",
          isDark
            ? "bg-slate-950 text-white shadow-black/50"
            : "bg-white text-slate-950",
        )}
      >
        {[
          { flag: "🇺🇸", label: "English" },
          { flag: "🇮🇩", label: "Indonesia" },
          { flag: "🇯🇵", label: "Japanese" },
          { flag: "🇫🇷", label: "French" },
        ].map((lang) => (
          <DropdownMenuItem
            key={lang.label}
            className={cn(
              "cursor-pointer px-4 py-3 text-sm font-bold transition-all gap-3 focus:outline-none",
              isDark
                ? "text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                : "text-slate-950 hover:bg-orange-50 focus:bg-orange-50 focus:text-orange-600 hover:text-orange-600",
            )}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
