import * as core from '@actions/core';
import * as constants from './constants';
import {downloadRelease} from './github';
import {extractTarGzToLocalbin} from './compression';
import {setExecutablePermission} from './permissions';
import {getFilenameFromUrl} from './urlbuilder';

export async function run() {
  try {
    const version = core.getInput(constants.INPUT_KUSTOMIZEGEN_VERSION);

    core.info(`Resolving Kustomizegen binary version: ${version}`);
    const downloadUrl = await downloadRelease(version);
    const outputFile = getFilenameFromUrl(downloadUrl);
    core.info(`Saved Kustomizegen file: ${outputFile}`);

    core.info('Extracting Kustomizegen file...');
    const binaryFilePath = await extractTarGzToLocalbin(outputFile);

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
