#!/usr/bin/env bash

bash --version
set -e
set -v
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd "$DIR/.."
pushd "back"
sudo npm run test:unit
sudo npm run test:travis
sudo npm run
popd
pushd "client"
sudo npm run test:all &
popd
