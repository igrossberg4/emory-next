#!/bin/bash

# Script avoids route name collision if the generated static HTML page has the
# same name as an existing directory.
for filename in $(ls -l out/ | grep "html" | awk '{print $9}')
do
    filename_without_extension=(${filename//./ })
    if [ -d "out/$filename_without_extension" ]
    then
        echo "!! Route collision detected !!"
        echo "File out/$filename collides with folder out/$filename_without_extension and has been renamed to out/$filename_without_extension/index.html"
        echo ""
        mv "out/$filename" "out/$filename_without_extension/index.html"
    fi
done
