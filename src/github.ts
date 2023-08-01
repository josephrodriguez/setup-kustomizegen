import fs from 'fs';
import https from 'https';
import * as core from '@actions/core';
import {buildDownloadURL, getFilenameFromUrl} from './urlbuilder';

export async function downloadRelease(version: string): Promise<string> {
  const downloadURL = buildDownloadURL(version);
  const fileName = getFilenameFromUrl(downloadURL);

  core.info(`Attempting to download ${downloadURL}...`);

  return new Promise<string>((resolve, reject) => {
    download(downloadURL, fileName)
      .then(() => resolve(downloadURL))
      .catch(err => reject(err));
  });
}

function download(url: string, filePath: string): Promise<void> {
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

          download(redirectURL, filePath)
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
