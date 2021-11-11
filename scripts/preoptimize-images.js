const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');
const chalk = require('chalk');

console.log(fs.readdirSync('./out/images'))

glob('./public/**/*+(.png|.jpg)', function(error, files){
  if (error) {
    console.log(chalk.red.bold(error))
  } else {
    console.log(chalk.green(`🛈  ${files.length} files loaded`))
  }

  files.forEach((file) => {
    const fileParts = path.parse(file);
    const fileBuffer =  fs.readFileSync(file);

    if (fileParts.ext == '.jpg') {
      sharp(fileBuffer)
        .resize(300)
        .jpeg({
          quality: 90,
          mozjpeg: true
        })
        .toFile(`./processed/${fileParts.base}`);
    } else if (fileParts.ext == '.png') {

    } else {
      console.log(chalk.yellow.bold(`⚠  Warning! File with unprocessable extension ${fileParts.ext} was found on the asset list.`))
    }


    // sharp(fileBuffer)
    //   .resize(500)
    //   .webp({quality:100})
    //   //.resize(320, 240)
    //   .toFile('./out/images/mobile-'+image);
  });

})

