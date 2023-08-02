import {buildDownloadURL} from '../src/urlbuilder';

// Mock system.getArch() and system.getOSPlatform() for testing
jest.mock('../src/system', () => ({
  getArch: jest.fn(),
  getOSPlatform: jest.fn()
}));

const system = require('../src/system');

describe('buildDownloadURL', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should build the download URL for the specified version on linux amd64', () => {
    system.getArch.mockReturnValue('amd64');
    system.getOSPlatform.mockReturnValue('linux');
    const version = '1.2.3';
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/v1.2.3/kustomizegen_linux_amd64.tar.gz';
    expect(buildDownloadURL(version)).toBe(expectedURL);
  });

  it('should build the download URL for the latest version on linux amd64', () => {
    system.getArch.mockReturnValue('amd64');
    system.getOSPlatform.mockReturnValue('linux');
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/latest/kustomizegen_linux_amd64.tar.gz';
    expect(buildDownloadURL(undefined)).toBe(expectedURL);
  });

  it('should build the download URL for the latest version (explicit) on linux amd64', () => {
    system.getArch.mockReturnValue('amd64');
    system.getOSPlatform.mockReturnValue('linux');
    const version = 'latest';
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/latest/kustomizegen_linux_amd64.tar.gz';
    expect(buildDownloadURL(version)).toBe(expectedURL);
  });

  it('should build the download URL for the specified version on darwin arm64', () => {
    system.getArch.mockReturnValue('arm64');
    system.getOSPlatform.mockReturnValue('darwin');
    const version = '0.2.1';
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/v0.2.1/kustomizegen_darwin_arm64.tar.gz';
    expect(buildDownloadURL(version)).toBe(expectedURL);
  });

  it('should build the download URL for the latest version on darwin arm64', () => {
    system.getArch.mockReturnValue('arm64');
    system.getOSPlatform.mockReturnValue('darwin');
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/latest/kustomizegen_darwin_arm64.tar.gz';
    expect(buildDownloadURL(undefined)).toBe(expectedURL);
  });

  it('should build the download URL for the latest version (explicit) on darwin arm64', () => {
    system.getArch.mockReturnValue('arm64');
    system.getOSPlatform.mockReturnValue('darwin');
    const version = 'latest';
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/latest/kustomizegen_darwin_arm64.tar.gz';
    expect(buildDownloadURL(version)).toBe(expectedURL);
  });

  it('should build the download URL for a specific version on windows amd64', () => {
    system.getArch.mockReturnValue('amd64');
    system.getOSPlatform.mockReturnValue('windows');
    const version = '1.0.0';
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/v1.0.0/kustomizegen_windows_amd64.tar.gz';
    expect(buildDownloadURL(version)).toBe(expectedURL);
  });

  it('should build the download URL for the latest version on windows amd64', () => {
    system.getArch.mockReturnValue('amd64');
    system.getOSPlatform.mockReturnValue('windows');
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/latest/kustomizegen_windows_amd64.tar.gz';
    expect(buildDownloadURL(undefined)).toBe(expectedURL);
  });

  it('should build the download URL for the latest version (explicit) on windows amd64', () => {
    system.getArch.mockReturnValue('amd64');
    system.getOSPlatform.mockReturnValue('windows');
    const version = 'latest';
    const expectedURL =
      'https://github.com/josephrodriguez/kustomizegen/releases/download/latest/kustomizegen_windows_amd64.tar.gz';
    expect(buildDownloadURL(version)).toBe(expectedURL);
  });
});
