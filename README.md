# slsplay

#### Getting started

##### Non provided prerequisites
 - Node (v4.3 exactly)
 - Npm
 - Git
 - docker
 - docker-compose

##### Global node libs
 `sudo npm install serverless -g`

##### Current dev workflow
   1.  git clone this repo and cd into the project root.
   2.  `npm install` (will install the project build dependencies)
   3.  `serverless project init`   (See http://docs.serverless.com/docs/introducing-serverless for more details)
   3.  `cd back`
   4.  `npm install` (will install the backend projects dependencies)
   5.  `npm run test:unit`
   6.  inside _meta/variables/s-variables-dev.json add a variable: `"localDynamoDbEndpoint":"http://loclahost:8000"`
   7.  in a new shell : `npm run localdb`
   8.  in a new shell : `npm run localserver`
   9.  `npm run test:integration` (will fail but run) :
   10.  In project root run `serverless dash deploy`, select and deploy items. 
   11. You can now visit the AWS consoles, locate your lambdas or gateways and run your tests.
   
##### Some Next Steps
   - Flesh out the CRUD API for Meetups to be complete
   - Add a UI in client to view them.
   - Add authorization with social media integration.
   - Add authorization home grown
   - Add ability to add emails and send notifications on Meetup event 'live' transition via stream -> queue -> emailer
   - Add View UI
   - Add Listing UI for public Meetups.
   
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

To give a more tangible feel for the architecuture experiment we will use an event organization site with the following requirements:

The application example used will be that of VIP Event platform, so users can create an event and schedule it. they can invite friends via email and friends on receipt of the event can confirm their attendance.

The person creating the event can upload a photo and video as well as a short description of the event. 

The creator can then mark the event as "Published" so the invitees can be informed.
Creator can add invitees after the event has been "Published" up and until the
event time is reached.

Events are virtual, so no location or address information will be entered , people will attend online. 

An hour prior to the time of the event the organizer will recieve a list of all the people who will attend. 

If time permits paid events will be created where the attendees will have to pay the organizer to attend when they agree to attend (equivalent to buying their ticket, non refundable). The creator will recieve the contributions from the attendees. 

It is intended to be opinionated, we will not use every tool out there, or the best necessarily but ones which the people invovled want to work with and try out. 
It will notbe complete or supported, it is purely a reference toy stack for 
our own learning. 


