#!/usr/bin/env bash
set -euo pipefail

DEPLOY_DIR=".deploy"

echo "===== BAHÁ'Í LIGHTHOUSE — BUILD DEPLOYMENT ====="

# Start with a completely clean deployment directory.
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

echo
echo "===== COPYING PUBLIC FILES ====="

# Copy only Git-tracked files that are valid public website resources.
while IFS= read -r file; do
  case "$file" in

    # Never publish repository/configuration/development files.
    .gitignore|README.md|wrangler.jsonc|build-deploy.sh)
      ;;

    # Public website files.
    *.html|*.js|*.css|*.xml|*.txt|assets/*)
      mkdir -p "$DEPLOY_DIR/$(dirname "$file")"
      cp "$file" "$DEPLOY_DIR/$file"
      echo "COPY  $file"
      ;;

    *)
      echo "SKIP  $file"
      ;;
  esac
done < <(git ls-files)

echo
echo "===== SECURITY SCAN ====="

if find "$DEPLOY_DIR" -type f | grep -Ei \
'(^|/)(\.env|\.gitignore|\.DS_Store|wrangler.*|package(-lock)?\.json|README\.md|.*backup.*|.*before-.*|.*\.bak|.*\.old|.*\.key|.*\.pem|.*secret.*|.*credential.*)$'
then
  echo
  echo "❌ SECURITY CHECK FAILED"
  echo "Deployment directory contains a forbidden file."
  exit 1
fi

echo "✅ No forbidden deployment files found."

echo
echo "===== DEPLOYMENT SUMMARY ====="
printf 'Files:  '
find "$DEPLOY_DIR" -type f | wc -l

printf 'Assets: '
find "$DEPLOY_DIR/assets" -type f | wc -l

echo
echo "✅ Deployment package built successfully."
echo "Nothing has been uploaded."
