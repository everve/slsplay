#!/usr/bin/env bash
set -e
pushd ..
export CI=true
sls project init -s travislocal -r eu-west-1  -p bogus -c -C
sleep 5
sls variables set -s travislocal -r eu-west-1 -k localDynamoDbEndpoint -v "http://localhost:8000"

sudo docker-compose up -d
sls setup db -s travislocal -r eu-west-1
popd
node --debug debug.js &
SERVER_PID=$!
sleep 5
npm run-script test:integration
kill -9 $SERVER_PID
sudo docker-compose stop

