#!/bin/sh

cd $(dirname $0)
git status
git add .
git commit -m "定期コミット"
git push origin master
read -p "Press any key to close."
