import fs from 'fs-extra';

const copyStaticFiles = async () => {
  try {
    // Check if index.html exists in the root directory
    const indexHtmlExists = await fs.pathExists('./index.html');
    if (indexHtmlExists) {
      console.log('index.html found in root. Copying to dist...');
      // Copy index.html to the dist folder
      await fs.copyFile('./index.html', './dist/index.html');
      console.log('index.html copied to dist folder.');
    } else {
      console.error('index.html not found in the root directory!');
    }
  } catch (err) {
    console.error('Error copying static files:', err);
  }
};

copyStaticFiles();
