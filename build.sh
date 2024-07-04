#!/usr/bin/bash

sudo cp dashboard/build/index.html api/templates/dashboard/
sudo cp -r dashboard/build/static/css/* /var/www/staticfiles/css
sudo cp -r dashboard/build/static/js/* /var/www/staticfiles/js
sudo systemctl restart nginx
sudo systemctl restart gunicorn
