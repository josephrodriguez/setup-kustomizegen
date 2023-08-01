import fs from 'fs/promises';
import * as core from '@actions/core';
import * as constants from './constants';
import {buildDownloadURL, getFilenameFromUrl} from './urlbuilder';

async function run() {
  try {
    const version = core.getInput(constants.INPUT_KUSTOMIZEGEN_VERSION);

    const downloadUrl = buildDownloadURL(version);
    const outputFile = getFilenameFromUrl(downloadUrl);
    await fs.unlink(outputFile);

    core.info(`File removed successfully: ${outputFile}`);
  } catch (err) {
    core.setFailed(`Error: ${err}`);
  }
}

if (require.main === module) {
  run();
} else {
  core.info('the script is loaded as a module, so skipping the execution');
}
