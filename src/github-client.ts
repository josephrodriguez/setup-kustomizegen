import fs from 'fs';
import https from 'https';
import * as core from '@actions/core';

// Client represents a GitHub client.
class GithubClient {
  // Add any client-specific fields here, if needed.

  // NewClient creates a new GitHub client.
  constructor() {
    // Add any initialization logic for the client here, if needed.
  }

  // DownloadRelease downloads a file from the given URL and saves it to the specified file path.
  async downloadRelease(
    version: string,
    arch: string,
    filePath: string
  ): Promise<void> {
    core.info(`Attempting to download ${version}..`);

    const downloadURL = `https://github.com/josephrodriguez/kustomizegen/releases/download/v${version}/kustomizegen_${arch}.tar.gz`;
    core.info(`Acquiring ${version} - ${arch} from ${downloadURL}`);

    return new Promise<void>((resolve, reject) => {
      this.download(downloadURL, filePath)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  private download(url: string, filePath: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const file = fs.createWriteStream(filePath);

      https
        .get(url, response => {
          if (response.statusCode === 302 || response.statusCode === 301) {
            const redirectURL = response.headers.location;
            response.destroy();

            if (!redirectURL) {
              reject(new Error('Redirect URL is missing'));
              return;
            }

            this.download(redirectURL, filePath)
              .then(() => resolve())
              .catch(err => reject(err));
          } else if (response.statusCode !== 200) {
            reject(
              new Error(
                `Failed to download the release, status code: ${response.statusCode}`
              )
            );
          } else {
            response.pipe(file);

            file.on('finish', () => {
              file.close();
              core.info('Download complete!');
              resolve();
            });

            response.on('error', err => {
              fs.unlink(filePath, () => {
                reject(
                  new Error(`Failed to write the release file: ${err.message}`)
                );
              });
            });
          }
        })
        .on('error', err => {
          fs.unlink(filePath, () => {
            reject(new Error(`Failed to get the file: ${err.message}`));
          });
        });
    });
  }
}

export default GithubClient;
