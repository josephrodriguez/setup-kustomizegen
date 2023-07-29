import * as core from '@actions/core';
import * as constants from './constants';
import * as system from './system';
import GithubClient from './github-client';
import {extractTarGzToLocalbin} from './compression';
import {setExecutablePermission} from './permissions';
import {getOutputFilePath} from './path';

export async function run() {
  try {
    const version = core.getInput(constants.INPUT_KUSTOMIZEGEN_VERSION);
    const arch = system.getArch();
    const releasePath = getOutputFilePath();

    core.info(`Resolving Kustomizegen binary ${arch} - ${version}`);
    const client = new GithubClient();
    await client.downloadRelease(version, arch, releasePath);
    core.info(`Saved Kustomizegen file: ${releasePath}`);

    core.info('Extracting Kustomizegen file...');
    const binaryFilePath = await extractTarGzToLocalbin(releasePath);

    core.info('Set executable permissions...');
    await setExecutablePermission(binaryFilePath);

    core.info('Completed');
  } catch (err) {
    core.setFailed(`Error: ${err}`);
  }
}

if (require.main === module) {
  run();
} else {
  core.info('the script is loaded as a module, so skipping the execution');
}
