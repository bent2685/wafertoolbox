import type { IconifyIcon } from "@iconify/react";

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon: string | IconifyIcon;
  path: string;
  category?: string;
}

export const tools: ToolItem[] = [
  {
    id: "aoi-map-diff",
    name: "AOI Map Diff",
    description: "比较两个AOI map，输出wafer差异点",
    icon: "tabler--zoom-scan",
    path: "/tools/aoi-map-diff",
    category: "Wafer工具",
  },
  {
    id: "wafer-overlay",
    name: "AOI Wafer Overlay",
    description: "解析AOI map并叠加多个wafer结果",
    icon: "tabler--target-arrow",
    path: "/tools/wafer-overlay",
    category: "Wafer工具",
  },
  {
    id: "test-point-analyzer",
    name: "测试点分析",
    description: "分析PCB测试点位置和覆盖率",
    icon: "tabler--scan",
    path: "/tools/test-point-analyzer",
    category: "PCB工具",
  },
];
