#!/bin/bash

set -e


ARTIFACT_FOLDER=artifact

if [[ ! -d scripts ]] && [[ ! -f Makefile ]]
then
  echo "This scripts should be run from the root folder of the repository"
  exit -1
fi


if [[ ! -d $ARTIFACT_FOLDER ]]
then
  git clone git@gitlab.com:metadrop-group/bluespark-emory-artifacts.git $ARTIFACT_FOLDER
fi

# Update artifact repo.
cd $ARTIFACT_FOLDER
git pull --ff-only
cd -


# Remove current content.
rm $ARTIFACT_FOLDER/docroot -fr

# Copy generated prod files
cp out $ARTIFACT_FOLDER/docroot -r

# Copy htaccess file
cp config/htaccess $ARTIFACT_FOLDER/docroot/.htaccess

# Commit
cd $ARTIFACT_FOLDER
git add .
git commit -m "Artifact commit by artifact generation script"
cd -

echo -e "\n\n\nArtifact generation complete!"




