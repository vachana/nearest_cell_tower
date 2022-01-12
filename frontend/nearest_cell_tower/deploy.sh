echo "Stopping Container..."
docker container stop nearest_cell_tower_ui_container
echo "Running container..."
docker run -d -p 8080:8080 --rm --name nearest_cell_tower_ui_container nearest_cell_tower_ui_image