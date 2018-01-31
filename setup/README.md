## Setup

- `cd my-wordpress-site`
- `sh setup/setup.sh`

## Local Development
`docker-compose up -d`

This creates four docker containers:
- MySQL database
- Wordpress Container (php/apache)
- NPM Container (install javascript dependencies, and task run for the default theme)
- Composer Container (wordpress plugins & *wordpress itself* which is version controlled via composer)

If you update the package.json or composer.json file you have to rebuild the images `docker-compose build && sh build.sh`.

Copy the files from the composer container. This is so we don't have to re-install the composer packages every `up` and they can also be rsynced up to the server for deployment. Run `sh build.sh`

**Note**: You don't have to re-run above if you already have the wordpress and plugins folders in the local directory and you haven't changed the composer.json file.

## Building and Deploying

To prepare for deploying:
`sh build.sh`

**Note** The Docker image name depends on the root name of your folder e.g. 'my-wordpress-site_npm'.

This runs the build command in package.json within a temporary container built from the wordpress_npm image.

This current setup uses `rsync` via `deploy.sh` (which was copied into the root from running `sh setup/setup.sh`).

Update the `deploy.sh` file by changing USERNAME, DOMAIN, and FOLDER to match your remote server's information. Then you can run `sh deploy.sh`.

On your server:
- `cp setup/htaccess-remote .htaccess` (this version has more security settings but you will need to update it with your site details).
- `cp setup/wp-config-sample.php wp-config.php`. Then update the database values to match what you have configured with your web host AND fill in the unique keys and salts ([generate these](https://api.wordpress.org/secret-key/1.1/salt)). It's also a good idea to change the table prefix from `wp_` to something unique.

## More Details

#### Adding more Wordpress Plugins
Add the plugins to composer.json (search for the [here](https://wpackagist.org)); a few are in there already as examples.

#### Connecting to the MySql Container from Sequel Pro.
Host: 0.0.0.0
Port: 32769 or something similar.
Make sure you check the actual port as it can be different everytime. `docker ps -a`.

#### Remote DB Syncing with Local
This technique is very basic at the moment.
- create a folder on your remote server called "_db_backups"
- Update the "backup-db.sh" file in your root directory with your mysql info and then run this script: `sh backup-db.sh` on your remote server.
- Then on your local machine, copy the generated mysql dump files: `scp -P 2222 -r USER_NAME@HOST_ADDRESSS:/absolute/path/to/_db_backups/ .`
- You can then use these gzipped mysql files locally when you spin up your dev environment.
- *Note* You can also setup a crontab (example in the setup folder) to run this script on a certain schedule.

#### Kill And remove All containers
`docker rm -fv $(docker ps -aq)`

#### Removing the Default Theme
If you don't have a use for a custom theme that has a dev workflow run on NPM and Gulp, you can remove the "npm" entry in docker-compose.yml. You can also remove `gulpfile.js`, `package.json` and the whole default theme directory.

#### Building for Deploy
`docker run -i -t -v $(pwd)/.:/var/www/html -w="/var/www/html" wordpress_npm npm run build`

## Todo
- Add details on remote server configuration.
- Remove gulp (or make it more agnostic to the setup).
- Create better/safer way to backup whole site (db, uploads, etc...)
