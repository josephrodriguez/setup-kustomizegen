import os from 'os';

export function getPlatform(): string {
  let platform: string = os.platform();

  if (platform === 'win32') {
    platform = 'windows';
  }

  return platform;
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
