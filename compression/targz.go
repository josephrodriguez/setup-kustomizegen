package compression

import (
	"archive/tar"
	"compress/gzip"
	"fmt"
	"io"
	"os"
	"path/filepath"
)

func ExtractTarGz(source, target string) error {
	reader, err := os.Open(source)
	if err != nil {
		return fmt.Errorf("failed to open source file: %w", err)
	}
	defer reader.Close()

	gzipReader, err := gzip.NewReader(reader)
	if err != nil {
		return fmt.Errorf("failed to create gzip reader: %w", err)
	}
	defer gzipReader.Close()

	tarReader := tar.NewReader(gzipReader)

	return extractFiles(tarReader, target)
}

func extractFiles(tarReader *tar.Reader, targetDir string) error {
	for {
		header, err := tarReader.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to read tar header: %w", err)
		}

		if err := extractFile(header, tarReader, targetDir); err != nil {
			return err
		}
	}

	return nil
}

func extractFile(header *tar.Header, tarReader *tar.Reader, targetDir string) error {
	targetFile := filepath.Join(targetDir, header.Name)

	switch header.Typeflag {
	case tar.TypeDir:
		return createDirectory(targetFile)
	case tar.TypeReg:
		return extractRegularFile(header, tarReader, targetFile)
	default:
		return fmt.Errorf("unknown type: %v in %s", header.Typeflag, header.Name)
	}
}

func createDirectory(targetDir string) error {
	if err := os.MkdirAll(targetDir, 0755); err != nil {
		return fmt.Errorf("failed to create directory: %w", err)
	}
	return nil
}

func extractRegularFile(header *tar.Header, tarReader *tar.Reader, targetFile string) error {
	targetDir := filepath.Dir(targetFile)
	if err := createDirectory(targetDir); err != nil {
		return err
	}

	file, err := os.Create(targetFile)
	if err != nil {
		return fmt.Errorf("failed to create file: %w", err)
	}
	defer file.Close()

	if _, err := io.Copy(file, tarReader); err != nil {
		return fmt.Errorf("failed to extract regular file: %w", err)
	}

	return nil
}
