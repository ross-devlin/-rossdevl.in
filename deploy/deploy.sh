#!/bin/bash
set -e

VPS_IP="YOUR_VPS_IP"
USER="root"
REMOTE_DIR="/var/www/rossdevl.in"

echo "Building..."
npm run build

echo "Deploying to $VPS_IP..."
rsync -avz --delete dist/ $USER@$VPS_IP:$REMOTE_DIR/

echo "Done."
