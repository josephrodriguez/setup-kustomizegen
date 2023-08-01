import os from 'os';

export function getOSPlatform(): string {
  const platform = os.platform();
  switch (platform) {
    case 'win32':
      return 'windows';
    case 'darwin':
      return 'darwin';
    case 'linux':
      return 'linux';
    default:
      throw new Error('Unable to determine the OS platform.');
  }
}

export function getArch(): string {
  let arch: string = os.arch();

  switch (arch) {
    case 'x64':
      arch = 'amd64';
      break;
    case 'x32':
      arch = '386';
      break;
    case 'arm':
      arch = 'armv6l';
      break;
  }

  return arch;
}
