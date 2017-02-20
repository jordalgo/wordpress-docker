#!/bin/bash -e

customized_files=(
  'composer.json'
  'deploy.sh'
  'deploy-exclude-list.txt'
  'gulpfile.js'
  'package.json'
  'backup-db.sh'
)

for i in ${customized_files[@]}; do
  echo Copying ${i} from setup to root and removing it from gitignore
  sed -i '' -e '/'${i}'/d' ./.gitignore
  cp setup/${i} .

done
echo "Finished!"
exit 0

