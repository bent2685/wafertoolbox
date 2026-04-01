import { Link } from "@tanstack/react-router";
import { useAppTitle } from "@/components/layout/app-title-context";
import { tools } from "@/config/tools";
import { cn } from "@/lib/utils";

const getToolIconTheme = (toolId: string) => {
  switch (toolId) {
    case "aoi-map-diff":
      return {
        box: "bg-chart-2/15 group-hover:bg-chart-2/25",
        icon: "text-chart-2",
      };
    case "wafer-overlay":
      return {
        box: "bg-chart-1/15 group-hover:bg-chart-1/25",
        icon: "text-chart-1",
      };
    default:
      return {
        box: "bg-primary/10 group-hover:bg-primary/20",
        icon: "text-primary",
      };
  }
};

const IndexView: React.FC = () => {
  useAppTitle({
    title: "首页",
  });

  return (
    <div className="relative flex h-full flex-col p-8 md:p-12 overflow-hidden bg-transparent">
      {/* Ambient discrete background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-chart-1/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3 animate-gradient-xy" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-chart-2/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3 animate-gradient-xy" />

      {/* Header */}
      <div className="mb-10 relative z-10 animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight pb-1 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
          工具箱
        </h1>
        <p className="text-base text-muted-foreground font-medium mt-2">选择工程辅助工具以开始数据分析</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {tools.map((tool, index) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group relative flex flex-col p-6 rounded-2xl glass-border bg-card/40 backdrop-blur-sm hover-lift overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
          >
            {/* Hover discrete radial glow inside card */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Icon Box */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/50 border border-border/50 group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm mb-4">
              <span
                className={cn("iconify", tool.icon, "w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors duration-300")}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                {tool.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Category Badge */}
            {tool.category && (
              <div className="mt-5 flex items-center">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/5 text-primary border border-primary/10">
                  {tool.category}
                </span>
              </div>
            )}
            <div className="relative z-10 mt-6 flex items-start gap-3">
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-md transition-colors",
                  iconTheme.box,
                )}
              >
                <span
                  className={cn("iconify h-6 w-6", tool.icon, iconTheme.icon)}
                />
              </div>
              <div className="min-w-0 pt-1">
                <h3 className="whitespace-nowrap text-sm font-medium text-card-foreground group-hover:text-foreground">
                  {tool.name}
                </h3>
              </div>
            </div>

            <p className="relative z-10 mt-5 line-clamp-2 text-xs leading-5 text-muted-foreground">
              {tool.description}
            </p>

            <div className="relative z-10 mt-auto flex items-end justify-between pt-5">
              {tool.category && (
                <div>
                  <span className="inline-flex items-center rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                    {tool.category}
                  </span>
                </div>
              )}
              <div className="text-[11px] font-medium tracking-[0.08em] text-muted-foreground/90">
                DESIGN BY IT
              </div>
            </div>
            </Link>
          );
        })}
      </div>

      {tools.length === 0 && (
        <div className="flex-1 flex items-center justify-center relative z-10 animate-fade-in-up">
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
