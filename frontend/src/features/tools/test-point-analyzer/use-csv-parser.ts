import { useState, useCallback } from "react"

export interface TestPointData {
  name: string
  data: (string | number)[][]
  columnIndex: number
}

export interface ParsedCSVData {
  fileName: string
  testPoints: TestPointData[]
}

const parseCSV = (text: string): string[][] => {
  const lines: string[][] = []
  let currentLine: string[] = []
  let currentCell = ""
  let insideQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (char === "," && !insideQuotes) {
      currentLine.push(currentCell)
      currentCell = ""
    } else if ((char === "\r" && nextChar === "\n" || char === "\n") && !insideQuotes) {
      currentLine.push(currentCell)
      lines.push(currentLine)
      currentLine = []
      currentCell = ""
      if (char === "\r") i++
    } else {
      currentCell += char
    }
  }

  if (currentCell || currentLine.length > 0) {
    currentLine.push(currentCell)
    lines.push(currentLine)
  }

  return lines
}

const extractTestPointData = (rows: string[][]): TestPointData[] => {
  const TITLE_ROW = 22
  const DATA_START_ROW = 33
  const START_COLUMN = 9 // Column J (0-indexed)

  const testPoints: TestPointData[] = []

  if (rows.length <= TITLE_ROW) {
    return testPoints
  }

  const titleRow = rows[TITLE_ROW]

  for (let col = START_COLUMN; col < titleRow.length; col++) {
    const testPointName = titleRow[col]?.trim()

    if (!testPointName || testPointName === "TestTime") {
      break
    }

    const data: (string | number)[] = []

    for (let row = DATA_START_ROW; row < rows.length; row++) {
      const cellValue = rows[row]?.[col]?.trim()

      if (!cellValue || cellValue === "") {
        break
      }

      const numValue = parseFloat(cellValue)
      data.push(isNaN(numValue) ? cellValue : numValue)
    }

    testPoints.push({
      name: testPointName,
      data,
      columnIndex: col,
    })
  }

  return testPoints
}

export const useCSVParser = () => {
  const [parsedFiles, setParsedFiles] = useState<ParsedCSVData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testPointNames, setTestPointNames] = useState<string[]>([])

  const parseFile = useCallback(async (file: File): Promise<ParsedCSVData | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const text = e.target?.result as string
          const rows = parseCSV(text)
          const testPoints = extractTestPointData(rows)

          const newTestPointNames = testPoints.map((tp) => tp.name)

          if (parsedFiles.length > 0) {
            const existingNames = testPointNames.sort()
            const newNames = newTestPointNames.sort()

            if (JSON.stringify(existingNames) !== JSON.stringify(newNames)) {
              setError(
                `文件 ${file.name} 的测试点与已有文件不一致，无法上传`
              )
              resolve(null)
              return
            }
          }

          resolve({
            fileName: file.name,
            testPoints,
          })
        } catch (err) {
          setError(`解析文件 ${file.name} 失败: ${err}`)
          resolve(null)
        }
      }

      reader.onerror = () => {
        setError(`读取文件 ${file.name} 失败`)
        resolve(null)
      }

      reader.readAsText(file)
    })
  }, [parsedFiles, testPointNames])

  const addFiles = useCallback(async (files: File[]) => {
    setIsLoading(true)
    setError(null)

    const results: ParsedCSVData[] = []

    for (const file of files) {
      const parsed = await parseFile(file)
      if (parsed) {
        results.push(parsed)

        if (testPointNames.length === 0) {
          setTestPointNames(parsed.testPoints.map((tp) => tp.name))
        }
      }
    }

    if (results.length > 0) {
      setParsedFiles((prev) => [...prev, ...results])
    }

    setIsLoading(false)
  }, [parseFile, testPointNames])

  const clearFiles = useCallback(() => {
    setParsedFiles([])
    setTestPointNames([])
    setError(null)
  }, [])

  const removeFile = useCallback((fileName: string) => {
    setParsedFiles((prev) => {
      const newFiles = prev.filter((f) => f.fileName !== fileName)
      if (newFiles.length === 0) {
        setTestPointNames([])
      }
      return newFiles
    })
  }, [])

  return {
    parsedFiles,
    testPointNames,
    isLoading,
    error,
    addFiles,
    clearFiles,
    removeFile,
  }
}
