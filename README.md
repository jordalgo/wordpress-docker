# A Custom Wordpress Docker Setup and Theme

## Setup

For local development:
- `cp htaccess-local .htaccess`

On your server:
- `cp htaccess-remote .htaccess` (this version has more security settings)
- `cp wp-config-sample.php wp-config.php`. Then update the database values to match what you have configured with your web host AND fill in the unique keys and salts ([generate these](https://api.wordpress.org/secret-key/1.1/salt)). It's also a good idea to change the table prefix from `wp_` to something unique.

## Local Development
`docker-compose up -d`

Copy the files from the composer container. This is so we don't have to re-install the composer modules every `up` and they can also be rsynced up to the server for deployment.
`docker cp wordpressdocker_composer_1:/var/www/html/wp-content/plugins ./wp-content/`
`docker cp wordpressdocker_composer_1:/var/www/html/wordpress .`

This creates four docker containers:
- MySQL database
- Wordpress Container (php/apache)
- NPM Container (install javascript dependencies, and task run for the default theme)
- Composer Container (wordpress plugins & *wordpress itself* which is version controlled via composer)

If you update the package.json or composer.json file you have to rebuild the images `docker-compose build`.

## Building and Deploying

To prepare for deploying:
`docker run -i -t -v $(pwd)/.:/deploy -w="/deploy" wordpress_npm npm run build`

This runs the build command in package.json within a temporary container built from the wordpress_npm image.

This current setup uses `rsync` via `deploy.sh`.

Update the deploy.sh file by changing USERNAME, DOMAIN, and FOLDER to match your remote server's information. Then you can run `sh deploy.sh`.

## More Details

#### Adding more Wordpress Plugins
Add the plugins to composer.json (search for the [here](https://wpackagist.org)); a few are in there already as examples.

#### Connecting to the MySql Container from Sequel Pro?
Host: 0.0.0.0
Port: 32769 or something similar.
Make sure you check the actual port as it can be different everytime. `docker ps -a`.

#### Kill And remove All containers
`docker rm -fv $(docker ps -aq)`

#### Removing the Default Theme
If you don't have a use for a custom theme that has a dev workflow run on NPM and Gulp, you can remove the "npm" entry in docker-compose.yml. You can also remove `gulpfile.js`, `package.json` and the whole default theme directory.

#### Building for Deploy
`docker run -i -t -v $(pwd)/.:/var/www/html -w="/var/www/html" wordpress_npm npm run build`

## Todo
- Add details on remote server configuration.
- Include steps on deploying (via rsync to start).
- Remove gulp (or make it more agnostic to the setup).
