#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Applying database migrations..."
python manage.py migrate --no-input

echo "Starting Gunicorn server..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000}
