#!/bin/bash

python compress.py 

if [ $? -eq 1 ]
then

current_date_time=`date "+%Y-%m-%d %H:%M:%S"`

git add .
git commit -m 'photo update: $current_date_time'
git push

fi
