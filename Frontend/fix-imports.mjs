import fs from 'fs-extra';
import {glob} from 'glob';

const fixImports = async () => {
  try {
    // Match JavaScript files in the dist directory
    const files = glob.sync('./dist/**/*.js');
    files.forEach(async (file) => {
      try {
        // Read file content
        const content = await fs.readFile(file, 'utf-8');
        
        // Replace .ts imports with .js
        const updatedContent = content.replace(/\.ts(?=["';])/g, '.js');
        
        // Write the updated content back to the file
        await fs.writeFile(file, updatedContent);
        console.log(`Fixed imports in: ${file}`);
      } catch (err) {
        console.error(`Error processing file ${file}:`, err);
      }
    });
  } catch (error) {
    console.error('Error fixing imports:', error);
  }
};

fixImports();
