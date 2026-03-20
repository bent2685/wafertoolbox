import WaferDiffView from "@/features/tools/wafer-diff/wafer-diff-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/aoi-map-diff")({
  component: WaferDiffView,
});
