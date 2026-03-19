import { useState } from "react";
import { FileDropZone } from "@/components/ui/file-drop-zone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAppTitle } from "@/components/layout/app-title-context";
import { useCSVParser } from "./use-csv-parser";
import { useTestPointAnalyzer } from "./use-test-point-analyzer";
import { TestPointBarChart } from "./test-point-bar-chart";
import { TestPointHorizontalChart } from "./test-point-horizontal-chart";
import { TestPointAreaLineChart } from "./test-point-area-line-chart";
import { TestPointStackedChart } from "./test-point-stacked-chart";
import { X, FileText, Upload, BarChart3, TrendingUp, Layers } from "lucide-react";

type ChartTabType = "bar" | "horizontal" | "area" | "stacked"

const chartTabs: { id: ChartTabType; label: string; icon: React.ReactNode }[] = [
  { id: "bar", label: "柱状图", icon: <BarChart3 className="h-3.5 w-3.5" /> },
  { id: "horizontal", label: "水平图", icon: <BarChart3 className="h-3.5 w-3.5 -rotate-90" /> },
  { id: "area", label: "趋势图", icon: <TrendingUp className="h-3.5 w-3.5" /> },
  { id: "stacked", label: "堆叠图", icon: <Layers className="h-3.5 w-3.5" /> },
]

const TestPointAnalyzerView: React.FC = () => {
  useAppTitle({
    title: "测试点分析",
  });

  const [selectedTestPoint, setSelectedTestPoint] = useState<string>("");
  const [activeChartTab, setActiveChartTab] = useState<ChartTabType>("bar");
  const {
    parsedFiles,
    testPointNames,
    isLoading,
    error,
    addFiles,
    clearFiles,
    removeFile,
  } = useCSVParser();

  const analysisResult = useTestPointAnalyzer(parsedFiles, selectedTestPoint);

  const handleFilesDrop = (files: File[]) => {
    addFiles(files);
  };

  const handleClearAll = () => {
    clearFiles();
    setSelectedTestPoint("");
  };

  const handleRemoveFile = (fileName: string) => {
    removeFile(fileName);
    if (parsedFiles.length === 1) {
      setSelectedTestPoint("");
    }
  };

  return (
    <div className="flex h-full flex-col p-6 gap-6">
      {/* Upper Section */}
      <div className="flex flex-col gap-4 flex-shrink-0">
        {/* Header and File Drop */}
        <div className="flex items-start gap-4">
          {/* File Drop Zone */}
          <FileDropZone
            accept={[".csv"]}
            onFilesDrop={handleFilesDrop}
            uploadedFiles={parsedFiles.map((f) => ({ name: f.fileName }))}
            className="h-34 w-64 flex-shrink-0"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                拖拽或点击上传
              </span>
            </div>
          </FileDropZone>

          {/* File List - Horizontal Tag List */}
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                已上传文件 ({parsedFiles.length})
              </Label>
              {parsedFiles.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="h-7 text-xs text-muted-foreground px-2"
                >
                  清空全部
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {parsedFiles.length === 0 ? (
                <div className="text-sm text-muted-foreground">暂无文件</div>
              ) : (
                parsedFiles.map((file) => (
                  <div
                    key={file.fileName}
                    className="group flex items-center gap-1.5 rounded-full border border-input bg-card px-3 py-1 text-xs"
                  >
                    <FileText className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground truncate max-w-[150px]">
                      {file.fileName}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(file.fileName)}
                      className="ml-0.5 rounded-full p-0.5 opacity-60 transition-opacity hover:bg-muted hover:opacity-100"
                      title="删除"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-xs text-muted-foreground">
                正在解析文件...
              </div>
            )}
          </div>
        </div>

        {/* Test Point Selector */}
        {parsedFiles.length > 0 && testPointNames.length > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1.5 flex-1 max-w-md">
              <Label
                htmlFor="test-point-select"
                className="text-sm font-medium"
              >
                选择测试点
              </Label>
              <Select
                value={selectedTestPoint}
                onValueChange={setSelectedTestPoint}
              >
                <SelectTrigger id="test-point-select" className="h-9">
                  <SelectValue placeholder="请选择测试点" />
                </SelectTrigger>
                <SelectContent>
                  {testPointNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedTestPoint && (
              <span className="text-xs text-muted-foreground self-end pb-0.5">
                已选择: {selectedTestPoint}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Lower Section - Charts Area */}
      {selectedTestPoint ? (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Chart Type Tabs */}
          <div className="flex-shrink-0 flex items-center gap-1 p-1 bg-muted/40 rounded-lg mb-3 w-fit">
            {chartTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChartTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  activeChartTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Chart Content */}
          <div className="flex-1 rounded-lg border border-border bg-card p-3 min-h-0">
            {analysisResult ? (
              <div className="h-full min-h-0">
                {activeChartTab === "bar" && (
                  <TestPointBarChart
                    fileFrequencyMaps={analysisResult.fileFrequencyMaps}
                    sortedNumbers={analysisResult.sortedNumbers}
                    testPointName={selectedTestPoint}
                  />
                )}
                {activeChartTab === "horizontal" && (
                  <TestPointHorizontalChart
                    fileFrequencyMaps={analysisResult.fileFrequencyMaps}
                    sortedNumbers={analysisResult.sortedNumbers}
                    testPointName={selectedTestPoint}
                  />
                )}
                {activeChartTab === "area" && (
                  <TestPointAreaLineChart
                    fileFrequencyMaps={analysisResult.fileFrequencyMaps}
                    sortedNumbers={analysisResult.sortedNumbers}
                    testPointName={selectedTestPoint}
                  />
                )}
                {activeChartTab === "stacked" && (
                  <TestPointStackedChart
                    fileFrequencyMaps={analysisResult.fileFrequencyMaps}
                    sortedNumbers={analysisResult.sortedNumbers}
                    testPointName={selectedTestPoint}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">暂无数据</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground text-sm">
            请上传文件并选择测试点
          </p>
        </div>
      )}
    </div>
  );
};

export default TestPointAnalyzerView;
