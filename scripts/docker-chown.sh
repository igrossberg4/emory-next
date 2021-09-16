#!/bin/bash

# Change owner of the container's main folder files.
set -ex
CONTAINER=$1
USER=${2:-$(id -u)}
GROUP=${3:-$(id -g)}

# Execute command as root in docker to prevent access denied when trying to chown.
docker-compose exec -T -u root $CONTAINER chown $USER:$GROUP . -R

