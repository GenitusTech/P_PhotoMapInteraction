#!/bin/sh

git pull
npm install && npm run build
composer install --prefer-dist --no-dev

php artisan view:clear
php artisan cache:clear

php artisan view:cache
php artisan route:cache
php artisan config:cache

php artisan clear-compiled

composer dumpautoload

php artisan optimize
