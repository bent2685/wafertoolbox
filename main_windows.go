//go:build windows

package main

import (
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

func getMacOptions() *mac.Options {
	return nil
}

func getWindowsOptions() *windows.Options {
	return &windows.Options{
		DisableWindowIcon:                 false,
		DisableFramelessWindowDecorations: true,
		WebviewIsTransparent:              false,
		WindowIsTranslucent:               false,
	}
}

func isFrameless() bool {
	return true
}
