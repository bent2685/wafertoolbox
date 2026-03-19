import { useMemo } from "react"

export interface FileFrequencyMap {
  fileName: string
  dataMap: Record<number, number>
}

interface TestPointData {
  name: string
  data: (string | number)[]
  columnIndex: number
}

interface ParsedCSVData {
  fileName: string
  testPoints: TestPointData[]
}

export const useTestPointAnalyzer = (
  parsedFiles: ParsedCSVData[],
  selectedTestPoint: string
) => {
  const analysisResult = useMemo(() => {
    if (!selectedTestPoint || parsedFiles.length === 0) {
      return null
    }

    // Analyze each file and create frequency maps
    const fileFrequencyMaps: FileFrequencyMap[] = parsedFiles.map((file) => {
      const testPoint = file.testPoints.find((tp) => tp.name === selectedTestPoint)

      if (!testPoint) {
        return {
          fileName: file.fileName,
          dataMap: {},
        }
      }

      // Preprocess: discard decimal points (truncate, not round)
      const dataMap: Record<number, number> = {}

      for (const value of testPoint.data) {
        if (typeof value === "number") {
          const truncatedValue = Math.trunc(value)
          dataMap[truncatedValue] = (dataMap[truncatedValue] || 0) + 1
        }
      }

      return {
        fileName: file.fileName,
        dataMap,
      }
    })

    // Get all unique numbers across all files for X-axis
    const allNumbers = new Set<number>()
    for (const { dataMap } of fileFrequencyMaps) {
      Object.keys(dataMap).forEach((key) => {
        allNumbers.add(Number(key))
      })
    }

    const sortedNumbers = Array.from(allNumbers).sort((a, b) => a - b)

    return {
      fileFrequencyMaps,
      sortedNumbers,
    }
  }, [parsedFiles, selectedTestPoint])

  return analysisResult
}
