import * as system from './system';

export function getOutputFilePath(): string {
  const platform = system.getPlatform();
  const arch = system.getArch();

  return `kustomizegen_${platform}_${arch}.tar.gz`;
}
