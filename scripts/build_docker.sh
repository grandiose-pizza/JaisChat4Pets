#!/bin/bash

image_name="jaischat4pets:dev"
echo "Building image: ${image_name}"

docker build --network=host -t $image_name .