#!/usr/bin/bash

sudo cp landing-page/build/index.html api/templates/
sudo cp -r landing-page/build/static/css/* /var/www/staticfiles/css
sudo cp -r landing-page/build/static/js/* /var/www/staticfiles/js
sudo systemctl restart nginx
sudo systemctl restart gunicorn
