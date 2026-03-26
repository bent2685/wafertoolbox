import { useEffect, useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { Environment } from "@wailsjs/runtime/runtime";
import { SetAppearance } from "@wailsjs/go/main/App";
import { AppTitleProvider } from "./app-title-context";
import { BaseSidebar } from "./sidebar-content/base-sidebar";
import { TitleBar } from "./title-bar";

const SidebarHeader = () => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    Environment().then((env) => {
      setIsMac(env.platform === "darwin");
    });
  }, []);

  return (
    <div
      className={`flex items-center justify-between px-3 ${isMac ? "mt-8" : "mt-3"} pb-3 shrink-0 z-100`}
    >
      <div className="flex items-center gap-2">
        <span className="iconify lucide--tool-case w-5 h-5 text-sidebar-foreground" />
        <span className="text-sm font-bold text-sidebar-foreground">
          Waferbox
        </span>
      </div>

      <div className="flex items-center gap-1"></div>
    </div>
  );
};

export const MainLayout = () => {
  const [isWindows, setIsWindows] = useState(false);
  const isUnlocked = true; // TEMP: password login is disabled.
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    Environment().then((env) => {
      setIsWindows(env.platform === "windows");
      document.documentElement.classList.toggle(
        "platform-mac",
        env.platform === "darwin",
      );
      document.documentElement.classList.toggle(
        "platform-windows",
        env.platform === "windows",
      );
    });
  }, []);

  // Sync native window appearance with frontend theme
  useEffect(() => {
    if (resolvedTheme) {
      SetAppearance(resolvedTheme);
    }
  }, [resolvedTheme]);

  return (
    <AppTitleProvider>
      <div
        className={`relative flex h-screen w-screen ${isWindows ? "bg-background" : ""}`}
      >
        {/* Sidebar */}
        <aside
          className={`flex h-full w-52 flex-col text-sidebar-foreground select-none ${
            isWindows ? "border-r border-sidebar-border bg-sidebar" : "bg-red"
          }`}
        >
          {/* Header with Navigation Buttons */}
          <SidebarHeader />

          {/* Dynamic Sidebar Content */}
          <BaseSidebar />
        </aside>

        {/* Main Content Area */}
        <main
          className={`flex-1 bg-background w-full overflow-auto p-0 rounded-l-xl`}
        >
          <div className={`flex h-full flex-col overflow-hidden`}>
            <TitleBar />
            <section className="min-h-0 flex-1 overflow-auto">
              <Outlet />
            </section>
          </div>
        </main>
        {!isUnlocked && null}
      </div>
    </AppTitleProvider>
  );
};
