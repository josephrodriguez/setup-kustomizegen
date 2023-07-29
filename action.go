package main

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"

	"github.com/josephrodriguez/setup-kustomizegen/compression"
	"github.com/josephrodriguez/setup-kustomizegen/github"
	permisssions "github.com/josephrodriguez/setup-kustomizegen/permissions"
)

const localBin string = "/usr/local/bin"

func main() {
	arch := runtime.GOARCH
	version := os.Getenv("VERSION")
	if version == "" {
		version = "latest"
	}

	archiveFile := fmt.Sprintf("kustomizegen_%s.tar.gz", arch)

	client := github.NewClient()
	if err := client.DownloadRelease(version, arch, archiveFile); err != nil {
		fmt.Printf("Error downloading kustomizegen: %s\n", err)
		os.Exit(1)
	}

	fmt.Println("Extracting kustomizegen...")
	if err := compression.ExtractTarGz(archiveFile, localBin); err != nil {
		fmt.Printf("Error extracting kustomizegen: %s\n", err)
		os.Exit(1)
	}

	binaryPath := filepath.Join(localBin, "kustomizegen")
	if err := permisssions.SetFilePermissions(binaryPath, 0755); err != nil {
		fmt.Printf("Error setting execution permissions: %s\n", err)
		os.Exit(1)
	}

	fmt.Println("Cleaning up ...")
	if err := os.Remove(archiveFile); err != nil {
		fmt.Printf("Error removing archive: %s\n", err)
		os.Exit(1)
	}

	fmt.Println("Installed Kustomizegen version:", version)
}
