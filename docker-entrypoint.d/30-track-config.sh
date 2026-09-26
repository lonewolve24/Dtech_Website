#!/bin/sh
set -eu
template="/usr/share/nginx/html/js/config.js.template"
target="/usr/share/nginx/html/js/config.js"
if [ -f "$template" ]; then
  export TRACK_API_URL="${TRACK_API_URL:-}"
  envsubst '${TRACK_API_URL}' < "$template" > "$target"
fi
