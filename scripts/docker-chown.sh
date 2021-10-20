#!/bin/bash

# Change owner of the container's main folder files.
set -ex
CONTAINER=$1
USER=${2:-$(id -u)}
GROUP=${3:-$(id -g)}

# Execute chown as root to prevent access denied.
docker-compose run -u root $CONTAINER chown 111:120 . -R

