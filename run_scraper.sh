#!/bin/bash

LOCKFILE="/tmp/scraper_x.lock"

# Check if the lock file exists
if [ -e "$LOCKFILE" ]; then
    echo "Script is already running."
    exit 1
fi

# Create a lock file
touch "$LOCKFILE"

# Debug: Log start time and environment
echo "Starting script at $(date)" >> /home/azureuser/MITx/cron.log
echo "Current PATH: $PATH" >> /home/azureuser/MITx/cron.log
echo "Current Python: $(which python3)" >> /home/azureuser/MITx/cron.log

# Activate the virtual environment
source /home/azureuser/MITx/venv/bin/activate

# Debug: Log environment after activation
echo "After activating venv, PATH: $PATH" >> /home/azureuser/MITx/cron.log
echo "After activating venv, Python: $(which python3)" >> /home/azureuser/MITx/cron.log

# Test Python and Django import
/home/azureuser/MITx/venv/bin/python3 -c "import django; print(django.get_version())" >> /home/azureuser/MITx/cron.log 2>&1

# Run your Python script using the full path to the virtualenv python
/home/azureuser/MITx/venv/bin/python3 /home/azureuser/MITx/manage.py scraper_x >> /home/azureuser/MITx/cron.log 2>&1

# Remove the lock file after the script is done
rm -f "$LOCKFILE"

# Debug: Log end time
echo "Script ended at $(date)" >> /home/azureuser/MITx/cron.log

