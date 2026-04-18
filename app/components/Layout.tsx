import type React from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";

type LayoutProps = {
  children: React.ReactNode;
  isFullscreen?: boolean;
};
export default function Layout({
  children,
  isFullscreen = false,
}: LayoutProps) {
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className={`flex ${isFullscreen ? "h-screen overflow-hidden" : "max-h-screen overflow-auto"}`}
      >
        <Sidebar />
        <div
          className={`relative flex flex-1 flex-col ${isFullscreen ? "h-screen overflow-hidden" : "max-h-screen overflow-auto"}`}
        >
          <Header />
          <div
            className={`flex flex-1 justify-center ${isFullscreen ? "p-0 overflow-hidden" : "p-5"} ${isDark ? "bg-content-dark" : "bg-content-background"}`}
          >
            <div
              className={`flex flex-1 justify-center ${isFullscreen ? "h-full w-full" : "w-[1920px]"}`}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
