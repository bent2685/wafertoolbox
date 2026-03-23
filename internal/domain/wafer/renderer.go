package wafer

import (
	"errors"
	"fmt"
	"image"
	"image/color"
	"image/draw"
	"math"
	"strings"
)

const sixInchWaferDiameterMM = 150.0
const sixInchWaferRadiusMM = sixInchWaferDiameterMM / 2

func parseHexColor(input string, fallback color.RGBA) color.RGBA {
	text := strings.TrimSpace(input)
	if text == "" {
		return fallback
	}
	if strings.HasPrefix(text, "#") {
		text = text[1:]
	}
	if len(text) != 6 {
		return fallback
	}

	var r, g, b uint8
	if _, err := fmt.Sscanf(text, "%02x%02x%02x", &r, &g, &b); err != nil {
		return fallback
	}
	return color.RGBA{R: r, G: g, B: b, A: 255}
}

func drawLine(img *image.RGBA, x0, y0, x1, y1 int, c color.Color) {
	dx := int(math.Abs(float64(x1 - x0)))
	dy := -int(math.Abs(float64(y1 - y0)))
	sx := -1
	if x0 < x1 {
		sx = 1
	}
	sy := -1
	if y0 < y1 {
		sy = 1
	}
	err := dx + dy

	for {
		if image.Pt(x0, y0).In(img.Rect) {
			img.Set(x0, y0, c)
		}
		if x0 == x1 && y0 == y1 {
			break
		}
		e2 := err * 2
		if e2 >= dy {
			err += dy
			x0 += sx
		}
		if e2 <= dx {
			err += dx
			y0 += sy
		}
	}
}

func drawEllipseOutline(img *image.RGBA, cx, cy, rx, ry float64, c color.Color) {
	if rx <= 0 || ry <= 0 {
		return
	}
	steps := 720
	prevX := int(cx + rx)
	prevY := int(cy)
	for i := 1; i <= steps; i++ {
		t := (2 * math.Pi * float64(i)) / float64(steps)
		x := int(cx + rx*math.Cos(t))
		y := int(cy + ry*math.Sin(t))
		drawLine(img, prevX, prevY, x, y, c)
		prevX, prevY = x, y
	}
}

func RenderWaferMap(req RenderRequest) (*image.RGBA, error) {
	if req.RowCount <= 0 || req.ColCount <= 0 {
		return nil, errors.New("invalid wafer size")
	}
	if req.MaxImageSize <= 0 {
		req.MaxImageSize = 2400
	}

	cellWRatio := req.XDies
	cellHRatio := req.YDies
	if cellWRatio <= 0 {
		cellWRatio = 1
	}
	if cellHRatio <= 0 {
		cellHRatio = 1
	}

	paddingCell := 4.0
	mmPadding := 2.0
	baseScale := math.Max(
		8,
		math.Floor(float64(req.MaxImageSize)/math.Max(float64(req.ColCount)*cellWRatio, float64(req.RowCount)*cellHRatio)),
	)
	cellW := baseScale * cellWRatio
	cellH := baseScale * cellHRatio

	bg := parseHexColor(req.BackgroundColor, color.RGBA{R: 244, G: 244, B: 244, A: 255})
	passColor := parseHexColor(req.PassColor, color.RGBA{R: 34, G: 197, B: 94, A: 255})
	failColor := parseHexColor(req.FailColor, color.RGBA{R: 229, G: 75, B: 79, A: 255})
	borderColor := parseHexColor(req.BorderColor, color.RGBA{R: 188, G: 211, B: 194, A: 255})
	axisColor := parseHexColor(req.AxisColor, color.RGBA{R: 115, G: 115, B: 115, A: 255})
	circleColor := parseHexColor(req.CircleColor, color.RGBA{R: 17, G: 17, B: 17, A: 255})
	centerColor := parseHexColor(req.CenterColor, color.RGBA{R: 0, G: 0, B: 0, A: 255})

	minCol := req.ColCount
	maxCol := -1
	minRow := req.RowCount
	maxRow := -1
	updateBounds := func(p Point) {
		if p.X < minCol {
			minCol = p.X
		}
		if p.X > maxCol {
			maxCol = p.X
		}
		if p.Y < minRow {
			minRow = p.Y
		}
		if p.Y > maxRow {
			maxRow = p.Y
		}
	}
	for _, p := range req.PassPoints {
		updateBounds(p)
	}
	for _, p := range req.FailPoints {
		updateBounds(p)
	}

	var dataLeft, dataRight, dataTop, dataBottom float64
	if maxCol >= minCol && maxRow >= minRow {
		dataLeft = (float64(minCol) + paddingCell) * cellW
		dataRight = (float64(maxCol+1) + paddingCell) * cellW
		dataTop = (float64(minRow) + paddingCell) * cellH
		dataBottom = (float64(maxRow+1) + paddingCell) * cellH
	} else {
		dataLeft = paddingCell * cellW
		dataRight = (float64(req.ColCount) + paddingCell) * cellW
		dataTop = paddingCell * cellH
		dataBottom = (float64(req.RowCount) + paddingCell) * cellH
	}

	centerX := (dataLeft + dataRight) / 2
	centerY := (dataTop + dataBottom) / 2
	waferRadiusPx := sixInchWaferRadiusMM * baseScale

	viewLeft := math.Min(0, math.Min(dataLeft, centerX-waferRadiusPx)) - mmPadding*baseScale
	viewTop := math.Min(0, math.Min(dataTop, centerY-waferRadiusPx)) - mmPadding*baseScale
	viewRight := math.Max(dataRight, centerX+waferRadiusPx) + mmPadding*baseScale
	viewBottom := math.Max(dataBottom, centerY+waferRadiusPx) + mmPadding*baseScale
	width := int(math.Ceil(viewRight - viewLeft))
	height := int(math.Ceil(viewBottom - viewTop))

	img := image.NewRGBA(image.Rect(0, 0, width, height))
	draw.Draw(img, img.Bounds(), &image.Uniform{C: bg}, image.Point{}, draw.Src)

	offsetX := -viewLeft
	offsetY := -viewTop
	centerX += offsetX
	centerY += offsetY

	paintDie := func(p Point, fill color.RGBA) {
		x := int(math.Round((float64(p.X)+paddingCell)*cellW + offsetX))
		y := int(math.Round((float64(p.Y)+paddingCell)*cellH + offsetY))
		w := int(math.Max(1, math.Round(cellW)))
		h := int(math.Max(1, math.Round(cellH)))
		for py := y; py < y+h; py++ {
			for px := x; px < x+w; px++ {
				if image.Pt(px, py).In(img.Rect) {
					img.Set(px, py, fill)
				}
			}
		}
		if w >= 2 && h >= 2 {
			topY := y
			bottomY := y + h - 1
			leftX := x
			rightX := x + w - 1
			for px := leftX; px <= rightX; px++ {
				if image.Pt(px, topY).In(img.Rect) {
					img.Set(px, topY, borderColor)
				}
				if image.Pt(px, bottomY).In(img.Rect) {
					img.Set(px, bottomY, borderColor)
				}
			}
			for py := topY; py <= bottomY; py++ {
				if image.Pt(leftX, py).In(img.Rect) {
					img.Set(leftX, py, borderColor)
				}
				if image.Pt(rightX, py).In(img.Rect) {
					img.Set(rightX, py, borderColor)
				}
			}
		}
	}

	for _, p := range req.PassPoints {
		paintDie(p, passColor)
	}
	for _, p := range req.FailPoints {
		paintDie(p, failColor)
	}

	drawLine(img, 0, int(centerY), width-1, int(centerY), axisColor)
	drawLine(img, int(centerX), 0, int(centerX), height-1, axisColor)
	drawEllipseOutline(img, centerX, centerY, waferRadiusPx, waferRadiusPx, circleColor)

	for py := int(centerY) - 2; py <= int(centerY)+2; py++ {
		for px := int(centerX) - 2; px <= int(centerX)+2; px++ {
			if image.Pt(px, py).In(img.Rect) {
				img.Set(px, py, centerColor)
			}
		}
	}

	return img, nil
}
