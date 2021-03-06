# slsplay
[![Build Status](https://travis-ci.org/everve/slsplay.svg?branch=master)](https://travis-ci.org/everve/slsplay)

#### Getting started

##### Non provided prerequisites
 - Node (v4.3 for back end, front end can be higher)
 - Npm
 - Git
 - docker
 - docker-compose

##### Global node libs
 `sudo npm install serverless -g`

##### Current dev workflow
   1.  git clone this repo and cd into the project root.

   2.  `npm install` (will install the project build dependencies)

   3.  `serverless project init`
        NB. At this point you should select a stage and region you want to work in ( stage can be your name).
        This will deploy your changes to CloudFormation (it wont actually activate your AWS deployment proper etc)

   4.  `cd back`

   5.  `npm install` (will install the backend projects dependencies)

   6.  `npm run test:unit`

   7.  `npm run localdb _stage_ _region_`
        NB. This will use docker-compose (you may need to update docker locally as some newer docker-compose causes
        this to fail for me on default ubuntu). It sudos to start docker daemon (feel free to improve).

   8.   `npm run localserver`
        NB. So this is a local server for testing the _serverless_ lambdas. It reads the gateway and lambda serverless
        files nad tries to simulate them in local development.

   9.  `npm run test:integration`
        NB. runs tests against the local dynamo and local server mentioned above.

   10. `sls dash deploy`
        NB. Will sync your cloud formation if needed and then push your actual API endpoints and lambdas.

##### Debugging the running lambdas
   1.  `npm run localdb _stage_ _region_` - Set up the local dynamodb
   2.  `node back/scripts/server.js --debug` - Start the server in debug mode to which you can attach.
   3.  `Use an IDE or other debugger to attach now to node at port 5858 on local host.`
   4.  `node back/tests/service-convos.int.js` - Run this in debug mode via IDE
   NB. I am not an expert in the debugging protocols for the various node/npm processes, but the above allows me
   to get break points in the IDE for server run lambdas and to debug the unit test code.
   TODO: Get a node / npm SDLC wizard to show me some neater workflow/tricks.
    
##### Some Next Steps
   - Integrate Cognito for developer and federated logins on the server side.
   - Integrate front end for sign-up/login/forgot screens leveraging back end JWT services. 
   - Flesh out the CRUD API for Meetups to be complete
   - Add ability to add emails and send notifications on Meetup event 'live' transition via stream -> queue -> emailer
   - Email template.
   - Add View UI for ticket purchase for RSVP ( email links to this)
   - Add recurring meetup (important = when you create a meetup ability to make it recur on a schedule - just monthly first)
   - Add public Meetups that everyone can see
   - Add search index for public events based on time-created, time-closing, keyword/category search, popularity(define).
   - Add native front end.
  
##### Project Structure
   - See [serverless microservice layout](http://docs.serverless.com/docs/application-architectures)

### Goals

This project aspires to be a reference architecture for a 'serverless' project, for the creators to learn some fun stuff. 

#### Components we want to explore

* A REST-ish service layer that leverages API Gateway, Lambda and DynamoDB with:
    * Basic CRUD operations.
    * Validation.
    * Decent error reporting.
    * Appropriate authentication / authorization ( social media ready). 

* A REST-ish service layer that leverages Gateway lambda, s3 and elastic transcoder to:
    * blob store of images and videos, appropriate authenticated retrieval etc.
    * integrate  replay of video into the front end as needed 
    
* A GraphQL based UI service layer that leverages API Gateway, Lambda which:
    * Delegates/composes calls from other back end service layer for sourcing.
    * Supports a more flexible UI centric API to the web tier.
    * Has delegatory validation and auth ( social media ready). 

* A Mobile first web app leveraging S3+Cloud Front to deliver static assets containing a GraphQL(Relay?) enabled ReactJS application with:
    * Application Routes / Flow control
    * Form submissions / validations
    * Social Media login integrations

* A middle event-driven asynchronous tier leveraging DynamoDBStreams, Lambda, SQS
    * DynamoDBStream and Lambda acts as Database trigger:
    * Pushes message to SQS Queue
    * Queue consumer is responsible for taking asyncrhonous actions which       
          might include (updating a web-cache, updating a search index, populating
          a real time analytics store, doing other business function - e.g. email sending)
        
* A middle periodic asynchronous tier leveraging Lambdas with schedules:
    * May read directly from Dynamo or secondary materialized view
    * Take some clean up / diagnostic action, e.g. remove data from Dynamo
          that is no longer relevant.

#### Material example app

To give a more tangible feel for the architecture experiment we will use an event organization site with the following requirements:

The application example used will be that of VIP Event platform, so users can create an event and schedule it. they can invite friends via email and friends on receipt of the event can confirm their attendance.

The person creating the event can upload a photo and video as well as a short description of the event. 

The creator can then mark the event as "Published" so the invitees can be informed.
Creator can add invitees after the event has been "Published" up and until the
event time is reached.

Events are virtual, so no location or address information will be entered , people will attend online. 

An hour prior to the time of the event the organizer will recieve a list of all the people who will attend. 

If time permits paid events will be created where the attendees will have to pay the organizer to attend when they agree to attend (equivalent to buying their ticket, non refundable). The creator will recieve the contributions from the attendees. 

It is intended to be opinionated, we will not use every tool out there, or the best necessarily but ones which the people involved want to work with and try out. 
It will not be complete or supported, it is purely a reference toy stack for 
our own learning. 


