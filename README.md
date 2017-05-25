# completenews
[![Code Climate](https://codeclimate.com/github/andela-ookoro/completenews.svg)](https://codeclimate.com/github/andela-ookoro/completenews) [![Build Status](https://travis-ci.org/andela-ookoro/completenews.svg)](https://travis-ci.org/andela-ookoro/completenews)
[![Coverage Status](https://coveralls.io/repos/github/andela-ookoro/completenews/badge.svg?branch=production)](https://coveralls.io/github/andela-ookoro/completenews?branch=production)

## Introduction
### **`completenews`** is a single page web application built with [React](https://facebook.github.io/react/) framework that fetches and displays headline sources and articles.
### It has the following features;
  * User signin and signup via Google
  * User can view headline sources
  * User can view sources based on category
  * User can view headlines from a source
  * User can view headlines from a source basd on a sort option which may include; top, latest or popular
  * User can add headlines to her favourite list
  * User can view headlines on her favourite list
  * User can view healine web page on its website or in the application panel
  * User can share aritcles on social networks such as facebook, twitter and more
*  Click [here](http://completenews.herokuapp.com/) to access the app on Heroku

## Tech Stack
completenews uses [React](https://facebook.github.io/react/) and [Materialize css](http://materializecss.com/) on front-end, it has no back-end and it is served with Node.js/Express.js.

## Installation and setup
*  Navigate to a directory of choice on `terminal`.
*  Clone this repository on that directory using SSH or HTTP.
  *  Using SSH;

    >git clone git@github.com:andela_ookoro/completenews.git

  *  Using HTTP;

    >https://github.com/andela_ookoro/completenews.git


* Install the app's backend dependencies.Open node.js, navigate to the directory that contains the application code base,then enter the command below:
   >npm install
   #### Create a .env file in the root folder with the variables in the .env.example file; ensure that your change the values to real values.The variable includes [firebase web config values](console.firebase.google.com), [google client key](console.developers.google.com/) and [Newsapi key](newsapi.org). Ensure that you create a project on these platforms.
* The project test includes unit test and end to end test.It uses jest and nightmare for testing.
  #### To run test on the project, enter the command below
  > npm test
  #### To run the test and view coverage, enter the command below
  > npm test -coverage

* To start the application enter the command below in the terminal:
   >npm start
* If the command run successfully, node.js would display the text below.

  ```
  ----------------------------------------------------------------------
  Completenews running at  http://localhost:1142

  ```
* Open the  **[link](http://localhost:1142)** on a browser to view the application.
  [Google chrome ](https://www.google.com/chrome/) is recommended 

## Code Structure
* React files are stored in `src/js/(action|component|action)` folders
* SCSS files  are stored in the `src/scss` folder
* Test scripts are stored in the `src/js/__tests__` folder

##Contribution
 ### To contribute to this project, follow the steps below:
  * Clone the repository as described in the section 'Installation and setup' above
  * Create a branch using the format, branch name => `Feature_<few words about your contribution>` 
  * Add your contributions to your branch
  * Push to your branch
  * Create a pull Request from your branch
  * We would review it and get back to you. (Ensure your attach a contact to your PR comment)
  * For more information send an email to  [Developing team](okwudiri.okoro@andela.com)


