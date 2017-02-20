#!/bin/bash
# note: keep the password within the single quotes below
mysqldump -u USERNAME -p'PW' DB_NAME | gzip > $HOME/public_html/_db_backups/DBNAME_`date '+%m-%d-%Y_%H-%M'`.sql.gz
