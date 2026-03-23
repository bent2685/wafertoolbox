package export

import (
	"bytes"
	"encoding/base64"
	"errors"
	"image/png"
	"strings"

	"waferbox/internal/domain/wafer"
)

type ByteStorage interface {
	SaveBytesToDownloads(fileName string, data []byte) (string, error)
}

type Service struct {
	storage ByteStorage
}

func NewService(storage ByteStorage) *Service {
	return &Service{storage: storage}
}

func decodeDataURL(dataURL string) ([]byte, error) {
	parts := strings.SplitN(dataURL, ",", 2)
	if len(parts) != 2 {
		return nil, errors.New("invalid data URL")
	}
	raw := parts[1]
	return base64.StdEncoding.DecodeString(raw)
}

func (s *Service) SaveBase64Image(dataURL string, fileName string) (string, error) {
	imageBytes, err := decodeDataURL(dataURL)
	if err != nil {
		return "", err
	}
	return s.storage.SaveBytesToDownloads(fileName, imageBytes)
}

func (s *Service) SaveWaferMapPNG(fileName string, req wafer.RenderRequest) (string, error) {
	img, err := wafer.RenderWaferMap(req)
	if err != nil {
		return "", err
	}

	var buf bytes.Buffer
	if err := png.Encode(&buf, img); err != nil {
		return "", err
	}
	return s.storage.SaveBytesToDownloads(fileName, buf.Bytes())
}
