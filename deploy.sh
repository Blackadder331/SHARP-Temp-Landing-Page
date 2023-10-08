#!/bin/bash

# pull new repo from git
git pull

# find the existing docker CONTAINER ID (IMAGE is temp-landing)
CONTAINER_ID=`docker ps | awk '/temp-landing/ {print $1}'`

# build and start the new one
docker build --tag temp-landing .
docker stop $CONTAINER_ID
docker rm $CONTAINER_ID
docker run --detach --network proxy-compose_default --name=temp-landing --restart=always temp-landing
docker image prune -f

echo "temp-landing is deployed"