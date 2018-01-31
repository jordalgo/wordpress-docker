#!/bin/bash -e

echo "Please enter Docker NPM image name (e.g. my-wordpress-site_npm): "
read imagename

echo "Copying Wordpress Plugins from Container" &&
docker cp wp-docker-composer:/var/www/html/wp-content/plugins ./wp-content/ &&
echo "Copying Wordpress from Container" &&
docker cp wp-docker-composer:/var/www/html/wordpress . &&
echo "Building CSS and JS for template" &&
docker run --rm  -i -t -v $(pwd)/.:/var/www/html -w="/var/www/html" $imagename npm run build &&
