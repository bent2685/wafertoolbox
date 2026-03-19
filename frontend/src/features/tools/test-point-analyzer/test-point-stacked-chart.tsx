import { useMemo } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import type { ChartOptions } from "chart.js"
import { Bar } from "react-chartjs-2"
import type { FileFrequencyMap } from "./use-test-point-analyzer"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface TestPointStackedChartProps {
  fileFrequencyMaps: FileFrequencyMap[]
  sortedNumbers: number[]
  testPointName: string
}

const getThemeColor = (variant: string): string => {
  const isDark = document?.documentElement?.classList?.contains("dark")
  const colors: Record<string, { light: string; dark: string }> = {
    foreground: { light: "#1a1a1a", dark: "#f1f5f9" },
    muted: { light: "#64748b", dark: "#94a3b8" },
    border: { light: "#e2e8f0", dark: "#334155" },
  }
  return colors[variant]?.[isDark ? "dark" : "light"] || "#000"
}

export const TestPointStackedChart: React.FC<TestPointStackedChartProps> = ({
  fileFrequencyMaps,
  sortedNumbers,
  testPointName,
}) => {
  const chartData = useMemo(() => {
    const colors = [
      { bg: "rgba(99, 102, 241, 0.75)", border: "rgb(99, 102, 241)" },
      { bg: "rgba(16, 185, 129, 0.75)", border: "rgb(16, 185, 129)" },
      { bg: "rgba(245, 158, 11, 0.75)", border: "rgb(245, 158, 11)" },
      { bg: "rgba(239, 68, 68, 0.75)", border: "rgb(239, 68, 68)" },
      { bg: "rgba(139, 92, 246, 0.75)", border: "rgb(139, 92, 246)" },
      { bg: "rgba(236, 72, 153, 0.75)", border: "rgb(236, 72, 153)" },
      { bg: "rgba(20, 184, 166, 0.75)", border: "rgb(20, 184, 166)" },
      { bg: "rgba(249, 115, 22, 0.75)", border: "rgb(249, 115, 22)" },
    ]

    const datasets = fileFrequencyMaps.map((file, index) => {
      const data = sortedNumbers.map((num) => file.dataMap[num] || 0)
      const colorSet = colors[index % colors.length]

      return {
        label: file.fileName,
        data,
        backgroundColor: colorSet.bg,
        borderColor: colorSet.border,
        borderWidth: 1,
        borderRadius: 3,
      }
    })

    return {
      labels: sortedNumbers.map(String),
      datasets,
    }
  }, [fileFrequencyMaps, sortedNumbers])

  const options: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeOutQuart" as const,
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
          align: "end" as const,
          labels: {
            font: { size: 10 },
            usePointStyle: true,
            pointStyle: "rectRounded" as const,
            padding: 10,
            boxWidth: 5,
            boxHeight: 5,
            color: () => getThemeColor("muted"),
          },
        },
        title: {
          display: true,
          text: `${testPointName}`,
          font: {
            size: 13,
            weight: "600" as const,
          },
          padding: {
            bottom: 12,
          },
          color: () => getThemeColor("foreground"),
        },
        tooltip: {
          mode: "index" as const,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 8,
          titleFont: { size: 11 },
          bodyFont: { size: 11 },
          boxWidth: 6,
          boxHeight: 6,
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || ""
              const value = context.parsed.y
              const total = context.chart.data.datasets.reduce(
                (sum: number, ds: any) => sum + (ds.data[context.dataIndex] || 0),
                0
              )
              const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0
              return `${label}: ${value} 次 (${percent}%)`
            },
            footer: (tooltipItems) => {
              const total = tooltipItems.reduce(
                (sum: number, item: any) => sum + item.parsed.y,
                0
              )
              return `总计: ${total} 次`
            },
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: {
            font: { size: 10 },
            color: () => getThemeColor("muted"),
            maxRotation: 45,
            minRotation: 0,
          },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: () => getThemeColor("border") + "20",
            drawBorder: false,
          },
          ticks: {
            font: { size: 10 },
            color: () => getThemeColor("muted"),
            stepSize: 1,
            precision: 0,
          },
        },
      },
      interaction: {
        mode: "nearest" as const,
        axis: "x" as const,
        intersect: false,
      },
    }),
    [testPointName]
  )

  return <Bar data={chartData} options={options} />
}
