import WaferOverlayView from "@/features/tools/wafer-overlay/wafer-overlay-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/wafer-overlay")({
  component: WaferOverlayView,
});
