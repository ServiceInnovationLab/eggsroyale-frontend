#!/bin/bash

# abort the script if there is a non-zero error
set -e

# show where we are on the machine
pwd
remote=$(git config remote.origin.url)

git config --global user.email "$CIRCLE_PROJECT_USERNAME@circleci"
git config --global user.name $CIRCLE_PROJECT_USERNAME

npm run deploy

