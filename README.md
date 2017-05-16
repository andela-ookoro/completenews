# completenews
+[![Code Climate](https://codeclimate.com/github/andela-ookoro/completenews.svg)](https://codeclimate.com/github/andela-ookoro/completenews) [![Build Status](https://travis-ci.org/andela-ookoro/completenews.svg)](https://travis-ci.org/andela-ookoro/completenews)
[![Coverage Status](https://coveralls.io/repos/github/andela-ookoro/completenews/badge.svg?branch=master)](https://coveralls.io/github/andela-ookoro/completenews?branch=master)

## Introduction
*  **`completenews`** is a node Powered applciation that fetch and display headline sources and articles.
*  It has the following features;
  * User signin and signup via Google
  * User can view sources
  * User can view sources based on category
  * User can view headlines based on source
  * User can view headlines based on source sort option which may include; top, latest or popular
  * User can store headline to her favourite list
  * User can view headline in her favourite list
  * User can view healine source on its website or in the application panel
  * User can share aritcles on social network such as facebook, twitter and more
*  Click [here](https://issuetrackerh20.herokuapp.com/) to access the app on Heroku

## Dependencies

### Back End Dependencies
*  This app's functionality depends on multiple node packages which include;
  *  **[body-parser](https://www.npmjs.com/package/body-parser)** - This framework is used to read request data from client.
  *  **[Express](https://expressjs.com/)** - This is the framework that serves route and manage the entire routing system
  *  **[Express3-handlebars](https://www.npmjs.com/package/express3-handlebars)** - This is the template engine used in the application.
  *  **[Firebase](https://firebase.google.com/)** - This is the remote database system used to store data.
  *  **[Jusibeb](https://jusibe.com/)** - This is an api used to send SMS.
  *  **[Nodemailer](https://nodemailer.com/)** - This package provides mailing feature.

## Front End Dependencies
*  **[Materialize css](http://materializecss.com/)** - The styling template engine used

## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory.
  *  Using SSH;

    >`git clone git@github.com:andela_ookoro/completenews.git`

  *  Using HTTP;

    >`https://github.com/andela_ookoro/completenews.git`


*  Install the app's backend dependencies.Open node.js, naviagte to the directory that contain the application ,then enter the command below:
  * install dependencies

  `npm install `
* To start the application enter the command below:
  * start server

  `node.js index.js `
* If the command run  successfully, node.js would display the text below.

  ```
  ----------------------------------------------------------------------
  Issue Tracker running at  http://localhost:1142

  ```
* Open the  **[link](http://localhost:1142)** on a browser to view the application.
  [Google chrome ](https://www.google.com/chrome/) is recommended 

## Description of the Web pages 
* Javasccript files  are in the public/js folder
* CsS files  are in the public/cc folder
* Template files  are in the views folder
The table below showa the routes and thier component
```
    Name          use                                                         js file       template      
    -----------------------------------------------------------------------------------------------------
    signin        Authentication                                              login          sigin
    signout       logout user                                                 
    myqueue       View issue(s) assign to user                                todo           myqueue
    myreport      View issue(s) reported by user                              issuelog       myreport
    opennissue    View open issue(s) reported to admin's department           openissue      openissue
    closeissue    View close issue(s) reported to admin's department          closeissue     closeissue
    profile       View and edit user profile                                  profile        profile
    reportissue   Report a new issue                                          issue          reportissue
    setsession    Start  user setsession
    505           Display error for programm bug                                             505
    404           Display error for wrong routes                                             404
    notify        Send notification to issue owner
  ```



