# Image optimization

In order to decrease build times, raw image uploads to the repository can
and should be pre-processed. This ensures the Next.js image manipulators will
receive assets that at least comply with a set of prerequisites:

* A maximum width is set in order to avoid expensive crops and resizes.
* EXIF metadata has been already stripped.
* Quality has been reduced.

This can be achieved by running the Node.js script `scripts/preoptimize-images.js`
and committing the results.

The script accepts the following flags:

* `--folder` - Outputs the processed assets to a different folder.
* `--quality` - Uses a different quality parameter (defaults to `90`).
* `--maxwidth` - Sets a custom max-width (defaults to `3000`). Important: use
integers, don't indicate the unit.
* `--allowReprocessing` - Allows the images to be reprocessed. If not, already
processed images won't be loaded. Defaults to `false`
* `--allowSizeIncrease` - Allows the script to output converted mages that are
larger than the original. Defaults to `false`

### Examples:

`node scripts/preoptimize-images.js`

Will process all images on ./public and overwrite them using the default presets
of `90` quality and `3000` max-width.

`node scripts/preoptimize-images.js --folder test`

Will process all images on ./public and output them to `./test` preserving the
original folder structure and using the default presets of `90` quality and `3000` max-width.

`node scripts/preoptimize-images.js --folder test --quality 10 --maxwidth 100`

Will process all images on ./public and output them to `./test` preserving the
original folder structure and using custom presets of `10` quality and `100` max-width.

`node scripts/preoptimize-images.js --allowReprocessing --allowSizeIncrease`

Will process all images on ./public and overwrite them using the default presets
of `90` quality and `3000` max-width. It will re-process all images again and will
output the image even if the final file size is larger than the original.

### Running from npm scripts and within docker containers

For integration with the existing tools an alias npm script has been created:

`npm run preprocess-images`

It can pass the flags to the original script, as any npm script, using `--`

`npm run preprocess-images -- --folder test`

This can be used in order to easily execute the image processing from within a
docker container and incorporate it to bash scripts or Makefile:

`docker-compose exec next_dev npm run preprocess-images`

### The processed-images.json

This script stores the last timestamp of each image processing on a `./processed-images.json`
file. Deleting this fill will re-trigger processing - as it will passing the `--allowReprocessing` flag.
