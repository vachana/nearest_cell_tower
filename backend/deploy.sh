echo "Stopping Container..."
docker container stop cell_tower_container 2> /dev/null
echo "Running container..."
docker run --rm -p 3000:3000 -d --name cell_tower_container backend_cell_tower_image
