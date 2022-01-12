echo "Building image..."
docker build . -t backend_cell_tower_image
# echo "Tagging image..."
# docker tag backend_cell_tower_image vachsh/nearest-cell-tower
# docker tag backend_cell_tower_image registry.digitalocean.com/nearest-cell-tower/cell_tower_image
# echo "Pushing image..."
# docker push registry.digitalocean.com/nearest-cell-tower/cell_tower_image