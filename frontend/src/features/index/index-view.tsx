import { Link } from "@tanstack/react-router";
import { useAppTitle } from "@/components/layout/app-title-context";
import { tools } from "@/config/tools";
import { cn } from "@/lib/utils";

const IndexView: React.FC = () => {
  useAppTitle({
    title: "首页",
  });

  return (
    <div className="relative flex h-full flex-col p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">工具箱</h1>
        <p className="mt-1 text-sm text-muted-foreground">选择工具开始使用</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-accent hover:bg-accent"
          >
            {tool.category === "Wafer工具" && (
              <div className="pointer-events-none absolute right-2.5 top-2.5 z-0 w-[40%] max-w-[124px] opacity-45">
                <img
                  src="/starshine-logo.png"
                  alt="StarShine"
                  className="h-auto w-full object-contain"
                  onError={(event) => {
                    const wrapper = event.currentTarget.parentElement;
                    if (wrapper) {
                      wrapper.style.display = "none";
                    }
                  }}
                />
              </div>
            )}
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 transition-colors group-hover:bg-primary/20">
              <span className={cn("iconify", tool.icon, "h-6 w-6 text-primary")} />
            </div>

            <div className={cn("relative z-10 mt-3", tool.category === "Wafer工具" && "pr-[34%] sm:pr-[30%]")}>
              <h3 className="text-sm font-medium text-card-foreground group-hover:text-foreground">
                {tool.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {tool.description}
              </p>
            </div>

            {tool.category && (
              <div className="mt-3">
                <span className="inline-flex items-center rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                  {tool.category}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <span className="iconify lucide--tool-case mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">暂无工具</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexView;
