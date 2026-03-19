//go:build darwin

package main

import (
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

func getMacOptions() *mac.Options {
	return &mac.Options{
		TitleBar: &mac.TitleBar{
			TitlebarAppearsTransparent: true,
			HideTitle:                  true,
			HideTitleBar:               false,
			FullSizeContent:            true,
			UseToolbar:                 false,
			HideToolbarSeparator:       true,
		},
		WebviewIsTransparent: true,
		WindowIsTranslucent:  true,
	}
}

func getWindowsOptions() *windows.Options {
	return nil
}

func isFrameless() bool {
	return false
}
