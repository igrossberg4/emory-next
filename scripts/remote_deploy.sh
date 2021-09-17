#!/bin/bash

# Change owner of the container's main folder files.
set -ex

echo EMORY_ARTIFACT_BRANCH=$EMORY_ARTIFACT_BRANCH

# Ssh credentials.
eval `ssh-agent -s`
ssh-add -k

ssh emory-dev@metadrop.pro -A 'cd project/docroot && git pull --ff-only'

echo "Deployed to DEV env"
