# A Custom Wordpress Docker Setup

## Setup

For local development:
`cp htaccess-local .htaccess`

On your server (this version has more security settings):
`cp htaccess-remote .htaccess`

`docker-compose up -d`

## More Details

#### Adding more Wordpress Plugins
Add the plugins to composer.json (search for the [here](https://wpackagist.org)); a few are in there already as examples.

#### Connecting to the MySql Container from Sequel Pro?
Host: 0.0.0.0
Port: 32769 or something similar.
Make sure you check the actual port as it can be different everytime. `docker ps -a`.

#### Kill And remove All containers
`docker rm -fv $(docker ps -aq)`

## Todo
- Add details on remote server configuration.
- Include steps on deploying (via rsync to start).
- Remove gulp (or make it more agnostic to the setup).
