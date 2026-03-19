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

interface TestPointHorizontalChartProps {
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

export const TestPointHorizontalChart: React.FC<TestPointHorizontalChartProps> = ({
  fileFrequencyMaps,
  sortedNumbers,
  testPointName,
}) => {
  const chartData = useMemo(() => {
    const colors = [
      "rgba(99, 102, 241, 0.8)",
      "rgba(16, 185, 129, 0.8)",
      "rgba(245, 158, 11, 0.8)",
      "rgba(239, 68, 68, 0.8)",
      "rgba(139, 92, 246, 0.8)",
      "rgba(236, 72, 153, 0.8)",
    ]

    const datasets = fileFrequencyMaps.map((file, index) => {
      const data = sortedNumbers.map((num) => file.dataMap[num] || 0)

      return {
        label: file.fileName,
        data,
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length].replace("0.8", "1"),
        borderWidth: 0,
        borderRadius: 3,
        barThickness: "flex" as const,
        maxBarThickness: 18,
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
      indexAxis: "y" as const,
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
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 8,
          titleFont: { size: 11 },
          bodyFont: { size: 11 },
          boxWidth: 6,
          boxHeight: 6,
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.x} 次`,
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: () => getThemeColor("border") + "20",
            drawBorder: false,
          },
          ticks: {
            font: { size: 10 },
            color: () => getThemeColor("muted"),
          },
        },
        y: {
          grid: { display: false },
          ticks: {
            font: { size: 10 },
            color: () => getThemeColor("muted"),
          },
        },
      },
      interaction: {
        mode: "nearest" as const,
        axis: "y" as const,
        intersect: true,
      },
    }),
    [testPointName]
  )

  return <Bar data={chartData} options={options} />
}
