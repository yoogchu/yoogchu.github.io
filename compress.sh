#!/bin/bash

python compress.py

current_date_time=`date "+%Y-%m-%d %H:%M:%S"`

git add .
git commit -m 'photo update: $current_date_time'
git push

