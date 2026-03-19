import { useEffect, useState } from "react";
import { Environment } from "@wailsjs/runtime/runtime";
import { WindowControls } from "./window-controls";
import { useAppTitleState } from "./app-title-context";

export const TitleBar = () => {
  const { title, children } = useAppTitleState();
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    Environment().then((env) => {
      setIsWindows(env.platform === "windows");
    });
  }, []);

  return (
    <header
      className={`drag-el flex h-12 shrink-0 items-center justify-between border-b border-border/80 bg-background/70 backdrop-blur-sm ${
        isWindows ? "pr-0" : "px-4"
      }`}
    >
      <div className={`truncate text-sm font-semibold text-foreground ${isWindows ? "pl-4" : ""}`}>
        {title ?? "Wafer 工具箱"}
      </div>

      <div className="no-drag flex items-center gap-2">
        {children}
        {isWindows && <WindowControls />}
      </div>
    </header>
  );
};
