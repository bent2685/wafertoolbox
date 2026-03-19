import TestPointAnalyzerView from '@/features/tools/test-point-analyzer/test-point-analyzer-view'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tools/test-point-analyzer')({
  component: TestPointAnalyzerView,
})
