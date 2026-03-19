import { useMemo, useRef } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import type { ChartOptions } from "chart.js"
import { Line } from "react-chartjs-2"
import type { FileFrequencyMap } from "./use-test-point-analyzer"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface TestPointAreaLineChartProps {
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

export const TestPointAreaLineChart: React.FC<TestPointAreaLineChartProps> = ({
  fileFrequencyMaps,
  sortedNumbers,
  testPointName,
}) => {
  const chartRef = useRef<ChartJS<"line">>(null)

  const chartData = useMemo(() => {
    const colorSets = [
      { main: "rgb(99, 102, 241)", area: "rgba(99, 102, 241, 0.2)" },
      { main: "rgb(16, 185, 129)", area: "rgba(16, 185, 129, 0.2)" },
      { main: "rgb(245, 158, 11)", area: "rgba(245, 158, 11, 0.2)" },
      { main: "rgb(239, 68, 68)", area: "rgba(239, 68, 68, 0.2)" },
      { main: "rgb(139, 92, 246)", area: "rgba(139, 92, 246, 0.2)" },
      { main: "rgb(236, 72, 153)", area: "rgba(236, 72, 153, 0.2)" },
    ]

    const datasets = fileFrequencyMaps.map((file, index) => {
      const data = sortedNumbers.map((num) => file.dataMap[num] || 0)
      const colors = colorSets[index % colorSets.length]

      return {
        label: file.fileName,
        data,
        borderColor: colors.main,
        backgroundColor: (context: any) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return colors.area

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
          gradient.addColorStop(0, colors.area.replace("0.2", "0.05"))
          gradient.addColorStop(1, colors.area.replace("0.2", "0.3"))
          return gradient
        },
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: colors.main,
        pointBorderColor: (ctx: any) => {
          const isDark = document.documentElement.classList.contains("dark")
          return isDark ? "#1e293b" : "#ffffff"
        },
        pointBorderWidth: 1.5,
        pointRadius: 2,
        pointHoverRadius: 5,
      }
    })

    return {
      labels: sortedNumbers.map(String),
      datasets,
    }
  }, [fileFrequencyMaps, sortedNumbers])

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeInOutCubic" as const,
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
          align: "end" as const,
          labels: {
            font: { size: 10 },
            usePointStyle: true,
            pointStyle: "circle" as const,
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
          intersect: false,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 8,
          titleFont: { size: 11 },
          bodyFont: { size: 11 },
          boxWidth: 6,
          boxHeight: 6,
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y} 次`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: () => getThemeColor("border") + "15",
            drawBorder: false,
          },
          ticks: {
            font: { size: 10 },
            color: () => getThemeColor("muted"),
            maxRotation: 45,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: () => getThemeColor("border") + "15",
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
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 2,
          hoverRadius: 5,
        },
      },
    }),
    [testPointName]
  )

  return <Line ref={chartRef} data={chartData} options={options} />
}
