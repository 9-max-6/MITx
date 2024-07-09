#!/usr/bin/bash

sudo cp dashboard/build/index.html api/templates/dashboard/
sudo cp -r dashboard/build/static/css/* /var/www/staticfiles/css
sudo cp -r dashboard/build/static/js/* /var/www/staticfiles/js
sudo cp -r dashboard/build/static/media/* /var/www/staticfiles/media

sudo systemctl restart nginx
sudo systemctl restart gunicorn
