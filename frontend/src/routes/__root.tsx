import { createRootRoute } from "@tanstack/react-router";
import { MainLayout } from "@/components/layout/main-layout";
import { ThemeProvider } from "@/components/theme/theme-provider";

const RootLayout = () => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <MainLayout />
    {/* <TanStackRouterDevtools /> */}
  </ThemeProvider>
);

export const Route = createRootRoute({ component: RootLayout });
