#!/bin/bash

python compress.py 
compress=$?

if [ $compress -eq 2 ]
then

echo 'pushing to github'

current_date_time=`date "+%Y-%m-%d %H:%M:%S"`

git add .
git commit -m 'photo update: $current_date_time'
git push

fi
