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
    id: "wafer-overlay",
    name: "AOI Wafer叠图",
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
