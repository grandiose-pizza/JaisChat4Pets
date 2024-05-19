#!/bin/bash

CONTAINER_NAME="jaischat4pets_cont"  # default container name
PORTS="3000:3000" # default port
IMAGE_NAME="jaischat4pets:dev"

source .env
echo "VLLM_URL: $VLLM_URL"
echo "VLLM_API_KEY: $VLLM_API_KEY"

# Display variable values
echo "Container Name: $CONTAINER_NAME"
echo "Port: $PORTS"
echo "Image Name: $IMAGE_NAME"

# Check if the container is already running and stop/remove it
if docker inspect -f '{{.State.Running}}' "$CONTAINER_NAME" 2>/dev/null; then
  echo "Stopping and removing existing container: $CONTAINER_NAME"
  docker stop "$CONTAINER_NAME" >/dev/null
  docker rm "$CONTAINER_NAME" >/dev/null
fi

# Run the new Docker container
# Removed --network host for compatibility with MacOS
docker run -d --rm -p "$PORTS" -e VLLM_URL="$VLLM_URL" -e VLLM_API_KEY="$VLLM_API_KEY" --name "$CONTAINER_NAME" "$IMAGE_NAME"
