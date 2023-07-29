package github

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

// Client represents a GitHub client.
type Client struct {
	// Add any client-specific fields here, if needed.
}

// NewClient creates a new GitHub client.
func NewClient() *Client {
	// Add any initialization logic for the client here, if needed.
	return &Client{}
}

// DownloadRelease downloads a file from the given URL and saves it to the specified file path.
func (c *Client) DownloadRelease(version, arch, filePath string) error {
	// Create the file
	out, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("failed to create the file: %w", err)
	}
	defer out.Close()

	downloadURL := fmt.Sprintf("https://github.com/josephrodriguez/kustomizegen/releases/download/v%s/kustomizegen_%s.tar.gz", version, arch)

	// Log the download information
	fmt.Printf("Downloading release: %s\n", downloadURL)

	// Get the data
	resp, err := http.Get(downloadURL)
	if err != nil {
		return fmt.Errorf("failed to get the file: %w", err)
	}
	defer resp.Body.Close()

	// Check if the request was successful
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to download the release, status code: %d", resp.StatusCode)
	}

	// Write the body to file
	size, err := io.Copy(out, resp.Body)
	if err != nil {
		return fmt.Errorf("failed to write the release file: %w", err)
	}

	fmt.Printf("Downloaded file size: %d bytes\n", size)
	fmt.Println("Download complete!")

	return nil
}
