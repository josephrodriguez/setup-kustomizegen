package permisssions

import (
	"fmt"
	"io/fs"
	"os"
)

func SetFilePermissions(filepath string, mode fs.FileMode) error {
	if err := os.Chmod(filepath, mode); err != nil {
		return fmt.Errorf("error setting execution permissions: %w", err)
	}
	return nil
}
