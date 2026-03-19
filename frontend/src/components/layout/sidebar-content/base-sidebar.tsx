import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { tools } from "@/config/tools";

// Base nav item styles
const navItemClasses =
  "flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors hover:bg-primary/10 hover:text-primary";

const activeNavClasses =
  "bg-primary text-primary-foreground font-medium";

const inactiveNavClasses = "text-sidebar-foreground";

export const BaseSidebar = () => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Check if home is active (only when exactly at "/")
  const isHomeActive = currentPath === "/";

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Tools List */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-0.5">
          {/* Home Entry */}
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className={cn(
              navItemClasses,
              isHomeActive ? activeNavClasses : inactiveNavClasses,
            )}
          >
            <span className="iconify lucide--home w-4 h-4 shrink-0" />
            <span>首页</span>
          </Link>

          {/* Divider */}
          <div className="my-2 border-t border-sidebar-border" />
          {tools.map((tool) => {
            const isActive = currentPath === tool.path;
            return (
              <Link
                key={tool.id}
                to={tool.path}
                activeOptions={{ exact: true }}
                className={cn(
                  navItemClasses,
                  isActive ? activeNavClasses : inactiveNavClasses,
                )}
              >
                <span
                  className={cn("iconify", tool.icon, "w-4 h-4 shrink-0")}
                />
                <span className="truncate">{tool.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-sidebar-border p-2">
        <div className="flex items-center gap-2 px-2.5 py-2 text-xs text-muted-foreground">
          <span className="iconify lucide--info w-3.5 h-3.5" />
          <span>v0.0.1</span>
        </div>
      </div>
    </div>
  );
};
