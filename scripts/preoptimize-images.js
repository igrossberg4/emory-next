// -----------------------------------------------------------------------------
// DEPENDENCIES AND CONFIG

// File and path node.js tools
const fs = require('fs');
const path = require('path');

// Image optimizer and processor
const sharp = require('sharp');

// Glob patterns for file loading
const glob = require('glob');

// CLI outpput formatter helper
const chalk = require('chalk');

// CLI flags and options helper
const minimist = require('minimist');

// Get the target folder from args;
const args = minimist(process.argv);
const targetFolder = args.folder ? args.folder : false;
const quality = typeof args.quality === 'number' ? args.quality : 90;
const maxWidth = typeof args.maxwidth === 'number' ? args.maxWidth : 3000;

// -----------------------------------------------------------------------------
// IMAGE PROCESSING

glob('./public/**/*+(.png|.jpg)', function(error, files){
  if (error) {
    console.log(chalk.red.bold(error))
  } else {
    console.log(chalk.green(`🛈  ${files.length} files loaded`))
  }

  files.forEach((file) => {
    const fileParts = path.parse(file);
    const fileBuffer =  fs.readFileSync(file);
    const outFolder = targetFolder ? `./${targetFolder}${fileParts.dir.replace('./public', '') }` : fileParts.dir;

    if(fileBuffer.toString() === '') {
      console.log(chalk.yellow(`⚠  Empty buffer on ${file}`));
      return;
    }

    // Check the existence of the target directory and, if not, create it.
    if (!fs.existsSync(outFolder)) {
      fs.mkdirSync(outFolder, { recursive: true });
      console.log(chalk.yellow(`⚠  Created ${outFolder} folder`));
    }

    if (fileParts.ext == '.jpg') {
      sharp(fileBuffer)
        .resize(maxWidth, null, {
          withoutEnlargement: true
        })
        .jpeg({
          quality: quality,
          mozjpeg: true
        })
        .toFile(`${outFolder}/${fileParts.base}`)
        .then(info => {
          console.log(chalk.green(`🖒  Processed ${outFolder}/${fileParts.base}`));
        })
        .catch(error => {
          console.log(chalk.red.bold(error))
        });
    } else if (fileParts.ext == '.png') {
      sharp(fileBuffer)
        .resize(maxWidth, null, {
          withoutEnlargement: true
        })
        .png({
          quality: quality,
          compressionLevel: 9,
        })
        .toFile(`${outFolder}/${fileParts.base}`)
        .then(info => {
          console.log(chalk.green(`🖒  Processed ${outFolder}/${fileParts.base}`));
        })
        .catch(error => {
          console.log(chalk.red.bold(error))
        });
    } else {
      console.log(chalk.yellow.bold(`⚠  Warning! File with unprocessable extension ${fileParts.ext} was found on the asset list.`))
    }
  });

})

