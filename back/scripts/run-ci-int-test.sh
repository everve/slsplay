#!/usr/bin/env bash

bash --version
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
set -e
set -v
pushd "$DIR/../.."
export CI=true
sls project init -s travislocal -r eu-west-1  -p bogus -c -C
sleep 5
sls --version
sls variables "set" -t "region" -s "travislocal" -r "eu-west-1" -k "localDynamoDbEndpoint" -v "http://localhost:8000"
sudo docker-compose up -d
sls setup db -s travislocal -r eu-west-1
popd
node --debug scripts/server.js &
SERVER_PID=$!
sleep 5
npm run-script test:integration
kill -9 $SERVER_PID
sudo docker-compose stop
