#!/usr/bin/env bash
set -e

mkdir -p ./images/pdf/
for file in ../../packages/polaris-icons-raw/icons/polaris/*.svg; do
  rsvg-convert -f pdf -o `echo $file | sed -e 's/.svg$/.pdf/' -e 's/..\/..\/packages\/polaris-icons-raw\/icons\/polaris\//images\/pdf\//'` "$file"
  echo "Converted $file"
done

bundle exec rake build
