package wafer

type Point struct {
	X int
	Y int
}

type RenderRequest struct {
	RowCount        int
	ColCount        int
	XDies           float64
	YDies           float64
	CenterX         float64
	CenterY         float64
	Radius          float64
	MaxImageSize    int
	BackgroundColor string
	PassColor       string
	FailColor       string
	BorderColor     string
	AxisColor       string
	CircleColor     string
	CenterColor     string
	PassPoints      []Point
	FailPoints      []Point
}
