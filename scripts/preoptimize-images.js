// -----------------------------------------------------------------------------
// DEPENDENCIES AND CONFIG

// File and path node.js tools
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

// Image optimizer and processor
const sharp = require('sharp');

// Glob patterns for file loading
const glob = require('glob');

// CLI outpput formatter helper
const chalk = require('chalk');

// CLI flags and options helper
const minimist = require('minimist');

// Get flags from args;
const args = minimist(process.argv);
const targetFolder = args.folder ? args.folder : false;
const quality = typeof args.quality === 'number' ? args.quality : 90;
const maxWidth = typeof args.maxwidth === 'number' ? args.maxWidth : 3000;
const avoidSizeIncrease = args.allowSizeIncrease ? false : true;

// Get the cached images from JSON, create it if still not present.
let processedImages;
try {
  processedImages = JSON.parse(fs.readFileSync('./processed-images.json').toString());
} catch {
  fs.writeFileSync('./processed-images.json', '{}', (err) => {
    if (!err) {
      console.log(chalk.green.bold(`🖒  Created processed-images.json`));
    } else {
      console.log(chalk.red.bold(`⚠  Error creating processed-images.json`));
    }
  })
  processedImages = JSON.parse(fs.readFileSync('./processed-images.json').toString());
}

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
    const { size }  = fs.statSync(file);

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
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
          if (avoidSizeIncrease && (info.size > size)) {
            console.log(chalk.gray(`🖓  ${file} not processed as the outcome will be larger in size`));
          } else {
            fs.writeFile(`${outFolder}/${fileParts.base}`, data, (err) => {
              if (!err) {
                processedImages[file] = Date.now();
                console.log(chalk.green.bold(`🖒  Processed ${outFolder}/${fileParts.base}`));
              } else {
                console.log(chalk.red.bold(`⚠  Error saving ${outFolder}/${fileParts.base}: ${err}`));
              }
            })
          }
        })
        .catch(err => {
          console.log(chalk.red.bold(`⚠  ${err}`));
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
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
          if (avoidSizeIncrease && (info.size > size)) {
            console.log(chalk.gray(`🖓  ${file} not processed as the outcome will be larger in size`));
          } else {
            fs.writeFile(`${outFolder}/${fileParts.base}`, data, (err) => {
              if (!err) {
                processedImages[file] = Date.now();
                console.log(chalk.green.bold(`🖒  Processed ${outFolder}/${fileParts.base}`));
              } else {
                console.log(chalk.red.bold(`⚠  Error saving ${outFolder}/${fileParts.base}: ${err}`));
              }
            })
          }
        })
        .catch(err => {
          console.log(chalk.red.bold(`⚠  ${err}`));
        });
    } else {
      console.log(chalk.yellow.bold(`⚠  Warning! File with unprocessable extension ${fileParts.ext} was found on the asset list.`))
    }
  });

})

