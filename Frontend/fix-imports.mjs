import {replaceInFile} from 'replace-in-file';

// Configure the paths to replace
const options = {
  files: 'dist/**/*.js',  // Only target JS files in the dist folder
  from: /(?<=from\s+['"])(\.\.\/[a-zA-Z0-9\-\/_.]+)(?=['"])/g, // Strict pattern to match relative imports only
  to: (match) => `${match}.js`,  // Append .js extension to the matched paths
};

(async () => {
  try {
    const results = await replaceInFile(options);replaceInFile
    console.log('Updated import paths in the following files:');
    console.log(results.map((r) => r.file).join('\n'));  
  } catch (error) {
    console.error('Error updating import paths:', error);
  }
})();
