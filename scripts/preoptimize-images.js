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
const allowReprocessing = args.allowReprocessing ? args.allowReprocessing : false;

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
let originalProcessedImages = { ...processedImages };

// -----------------------------------------------------------------------------
// IMAGE PROCESSING

glob('./public/**/*+(.png|.jpg)', function(error, files){
  if (error) {
    console.log(chalk.red.bold(error))
  } else {
    console.log(chalk.green(`🛈  ${files.length} files loaded`))
  }

  async function processFiles(files) {

    await Promise.all(files.map(async (file) =>{
      const fileParts = path.parse(file);
      const fileBuffer =  fs.readFileSync(file);
      const outFolder = targetFolder ? `./${targetFolder}${fileParts.dir.replace('./public', '') }` : fileParts.dir;
      const { size }  = fs.statSync(file);
      const lastProcessing = processedImages.hasOwnProperty(file) ? processedImages[file] : false;
      let buffer;

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
        buffer = sharp(fileBuffer)
          .resize(maxWidth, null, {
            withoutEnlargement: true
          })
          .jpeg({
            quality: quality,
            mozjpeg: true
          })
          .toBuffer({ resolveWithObject: true });
      } else if (fileParts.ext == '.png') {
        buffer = sharp(fileBuffer)
          .resize(maxWidth, null, {
            withoutEnlargement: true
          })
          .png({
            quality: quality,
            compressionLevel: 9,
          })
          .toBuffer({ resolveWithObject: true });
      } else {
        console.log(chalk.yellow.bold(`⚠  Warning! File with unprocessable extension ${fileParts.ext} was found on the asset list.`))
      }

      await buffer.then(({ data, info }) => {
        if (avoidSizeIncrease && (info.size > size)) {
          console.log(chalk.gray(`🖓  ${file} not processed as the outcome will be larger in size. Use --allowSizeIncrease to allow this.`));
        } else if (lastProcessing && lastProcessing < Date.now() && !allowReprocessing) {
          console.log(chalk.gray(`🖓  ${file} not processed because re-processing is forbidden. Use --allowReprocessing to skip this.`));
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
    }));
  }

  processFiles(files).then(()=> {
    const JSONOutput = JSON.stringify(processedImages);
    const originalJSONOutput = JSON.stringify(originalProcessedImages);

    if (JSONOutput != originalJSONOutput) {
      fs.writeFile('./processed-images.json', JSONOutput, (err) => {
        if (!err) {
          console.log(chalk.green.bold(`🖒  Updated ./processed-images.json`));
        } else {
          console.log(chalk.red.bold(`⚠  Error saving ./processed-images.json`));
        }
      })
    }
  })
})

