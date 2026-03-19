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
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">工具箱</h1>
        <p className="text-sm text-muted-foreground mt-1">选择工具开始使用</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group relative flex flex-col p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent transition-all duration-200"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <span
                className={cn("iconify", tool.icon, "w-6 h-6 text-primary")}
              />
            </div>

            {/* Content */}
            <div className="mt-3">
              <h3 className="text-sm font-medium text-card-foreground group-hover:text-foreground">
                {tool.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {tool.description}
              </p>
            </div>

            {/* Category Badge */}
            {tool.category && (
              <div className="mt-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                  {tool.category}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {tools.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="iconify lucide--tool-case w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">暂无工具</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexView;
