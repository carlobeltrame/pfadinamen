#!/bin/bash
set -e

echo "Uploading files to the server..."
lftp <<EOF
  set sftp:auto-confirm true
  set dns:order "inet"
  open -u $SSH_USERNAME, sftp://$SSH_HOST
  cd $SSH_DIRECTORY
  mirror -eRv -x '.htaccess' -x '.git'
EOF
