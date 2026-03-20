export type DieState = "pass" | "fail" | "empty";

export interface WaferCenter {
  x: number;
  y: number;
}

export interface ParsedAoiWaferMap {
  fileName: string;
  device: string;
  lot: string;
  wafer: string;
  waferId: string;
  xDies: number;
  yDies: number;
  yieldText: string;
  rowCount: number;
  colCount: number;
  grid: DieState[][];
  center: WaferCenter;
  radius: number;
  passCount: number;
  failCount: number;
  validCount: number;
}
