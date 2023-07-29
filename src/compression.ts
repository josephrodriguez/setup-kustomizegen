import {createReadStream, promises as fsPromises} from 'fs';
import {createGunzip} from 'zlib';
import tar from 'tar-fs';
import * as path from 'path';

export async function extractTarGzToLocalbin(
  sourceFile: string
): Promise<string> {
  const usrLocalBin = '/usr/local/bin';
  await extractTarGz(sourceFile, usrLocalBin);
  return path.join(usrLocalBin, 'kustomizegen');
}

async function extractTarGz(
  sourceFile: string,
  destinationDir: string
): Promise<void> {
  await fsPromises.mkdir(destinationDir, {recursive: true});

  return new Promise<void>((resolve, reject) => {
    createReadStream(sourceFile)
      .pipe(createGunzip())
      .pipe(
        tar.extract(destinationDir, {
          map: header => {
            header.name = header.name.replace(/^.*\//, '');
            return header;
          }
        })
      )
      .on('finish', resolve)
      .on('error', reject);
  });
}
