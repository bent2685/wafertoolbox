import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
const rootPath = new URL(".", import.meta.url).pathname;
import { resolve } from "path";
// https://vitejs.dev/config/``
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    svgr(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svg-ico")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": rootPath + "src",
      "@wa": rootPath + "wailsjs/go",
      "@runtime": rootPath + "wailsjs/runtime",
      "@wailsjs": rootPath + "wailsjs",
    },
  },
});
