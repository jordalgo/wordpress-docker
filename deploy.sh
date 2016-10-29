#!/bin/bash -e

rsync -e ssh -p 2222 -avz --exclude-from rsync-exclude-list.txt ./ USERNAME@DOMAIN:FOLDER
