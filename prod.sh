#!/bin/sh

# git pull
npm install
composer install

php artisan view:clear
php artisan cache:clear

php artisan view:cache
php artisan route:cache
php artisan config:cache

php artisan clear-compiled

composer dumpautoload

php artisan optimize
