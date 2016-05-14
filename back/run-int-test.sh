#!/usr/bin/env bash
pushd ..
sleep 5
sudo docker-compose up -d
sleep 5
sls setup db -s ci -r eu-central-1
sleep 5
node --debug debug.js
SERVER_PID=$!
sleep 5
node run-script test:integration
sleep 5
kill -9 $SERVER_PID
sudo docker-compose stop
popd

