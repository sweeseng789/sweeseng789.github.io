//=== Import ===//
const fs = require('fs');
const fs_extra = require('fs-extra');
const path = require('path');

const sourcePath = path.join(JSON.parse(fs.readFileSync('angular.json', 'utf8')).projects
                                                                                .portfolio
                                                                                .architect
                                                                                .build
                                                                                .options
                                                                                .outputPath, 
                             "browser");
const deploymentPath = "../";

//=== Delete files and directories ===//
console.log(`Removing old files:`);
fs.readdirSync(path.resolve(__dirname, deploymentPath)).forEach((filePath, index) => {
    const fileDir = path.join(deploymentPath, filePath);
    const stat = fs.statSync(fileDir);

    // Check if the directory is the current one that this script is in
    if (stat.isDirectory() && filePath === path.basename(__dirname)) {
        return;
    }

    // Delete file
    fs_extra.removeSync(fileDir);
    console.log(`${index+1}) ${fileDir}`);
});

console.log();

//=== Copy the files and directories from the output folder to the deployment folder ===//
// Check if the output directory exist
if (!fs.existsSync(sourcePath)) {
    console.log(`Output dir ${sourcePath} not found`);
    return;
}

// Move the files from output folder to deployment folder
fs_extra.copySync(sourcePath, deploymentPath);
console.log(`File(s) copied from '${sourcePath}' to '${deploymentPath}'`);