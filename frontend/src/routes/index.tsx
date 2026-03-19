import IndexView from '@/features/index/index-view'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexView,
})

