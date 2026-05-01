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

export default function LanguageSelector() {
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={`bg-transparent relative border rounded-full hover:bg-transparent ${
            isDark ? "hover:border-dark" : "hover:border-light"
          }`}
          size="icon"
        >
          <Languages name="languages" color={isDark ? "white" : "black"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer">
          <span className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <span className="mr-2">🇮🇩</span> Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <span className="mr-2">🇯🇵</span> Japanese
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <span className="mr-2">🇫🇷</span> French
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
