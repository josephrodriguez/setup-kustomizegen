import fs from 'fs/promises';
import * as core from '@actions/core';
import {getOutputFilePath} from './path';

async function run() {
  try {
    const releasePath = getOutputFilePath();
    await fs.unlink(releasePath);
    core.info(`File removed successfully: ${releasePath}`);
  } catch (err) {
    core.setFailed(`Error: ${err}`);
  }
}

if (require.main === module) {
  run();
} else {
  core.info('the script is loaded as a module, so skipping the execution');
}
