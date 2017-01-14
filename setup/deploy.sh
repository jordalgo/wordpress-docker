#!/bin/bash -e

# CHOOSE YOUR DEPLOYMENT CONFIGURATION
# Below are a few options for you to deploy your code
# Choose one by commenting out the others
# Or comment them all out and add your own


# All variables hardcoded
# Hardcode your  username@server.name:directory (ex. johndoe@mysite.com:public-www)
# rsync -e ssh -p -avz --exclude-from deploy-exclude-list.txt ./ USERNAME@SERVER.NAME:DIRECTORY


# Prompt for username
# Hardcode your server.name:directory (ex. mysite.com:public-www)
echo "Please enter username: "
read usr
rsync -e ssh -p -avz --exclude-from deploy-exclude-list.txt ./ $usr@SERVER.NAME:DIRECTORY


# Prompt for each detail
# echo "Please enter username"
# read usr
# echo "Please enter server.name:directory"
# read srvdir
# rsync -e ssh -p -avz --exclude-from deploy-exclude-list.txt ./ $usr@$srvdir


# Do it all with ssh keys:
# https://www.digitalocean.com/community/tutorials/how-to-copy-files-with-rsync-over-ssh

