import * as fs from 'fs';

export async function setExecutablePermission(filePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.chmod(filePath, 0o755, err => {
      if (err) {
        reject(
          new Error(`Failed to set executable permission on file: ${filePath}`)
        );
      } else {
        resolve();
      }
    });
  });
}
