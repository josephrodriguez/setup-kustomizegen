import {parse} from 'path';
import * as system from './system';

export function getFilenameFromUrl(url: string): string {
  const parsedPath = parse(url);
  return parsedPath.base;
}

export function buildDownloadURL(version: string | undefined): string {
  const releaseVersion =
    version !== undefined && version !== '' && version !== 'latest'
      ? `v${version}`
      : 'latest';
  const arch = system.getArch();
  const platform = system.getOSPlatform();

  const downloadURL = `https://github.com/josephrodriguez/kustomizegen/releases/download/${releaseVersion}/kustomizegen_${platform}_${arch}.tar.gz`;
  return downloadURL;
}
