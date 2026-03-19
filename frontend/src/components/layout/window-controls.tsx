import { useEffect, useState } from "react";
import {
  WindowMinimise,
  WindowToggleMaximise,
  WindowIsMaximised,
  Quit,
} from "@wailsjs/runtime/runtime";

export const WindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkMaximized = async () => {
      if (isMounted) {
        const maximized = await WindowIsMaximised();
        setIsMaximized(maximized);
      }
    };

    checkMaximized();

    // Poll for maximized state changes
    const interval = setInterval(checkMaximized, 500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center">
      <button
        onClick={() => WindowMinimise()}
        className="no-drag flex h-8 w-12 items-center justify-center text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
        aria-label="Minimize"
      >
        <span className="iconify lucide--minus w-4 h-4" />
      </button>

      <button
        onClick={() => WindowToggleMaximise()}
        className="no-drag flex h-8 w-12 items-center justify-center text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      >
        {isMaximized ? (
          <span className="iconify lucide--copy w-3.5 h-3.5" />
        ) : (
          <span className="iconify lucide--square w-3.5 h-3.5" />
        )}
      </button>

      <button
        onClick={() => Quit()}
        className="no-drag flex h-8 w-12 items-center justify-center text-foreground/70 hover:bg-destructive hover:text-destructive-foreground transition-colors"
        aria-label="Close"
      >
        <span className="iconify lucide--x w-4 h-4" />
      </button>
    </div>
  );
};
