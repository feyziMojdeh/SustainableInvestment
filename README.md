# Implementation Steps

## POC

I started with a proof of concept to make sure that I can have a working app:

* Setting up a mock server with json-servers
* Setting up the PrimeVue components for vuejs files
* Setting up the Primevue chart for visualizing the sustainability scores
* Connecting the Json files to front end visual

Then, I tried to connect more pieces together.

* Setting up the data table for showing the data in a tabular format
* Setting up the filter for the data table
* Setting up the unit tests for the components

## Challenges
* I had the following major challenges in the given assignment (mostly since it was my first using primevue/mock server and Vitest):
    * Learning how to work with PrimeVue and PrimeVue chart.
    * Challengeing on applying filter on PrimeVue Data table
    * Learning how to work with Vitest
    * Learning how to work with Json server and MSW
    * Coming up with a proper solution for working with multiple json file in json server

    

According to the assignment criteria, I assumed it is intended to load the entire graph in one go and not eagerly load the leaves.

## ToDo
* Setting up Repository and Service layer for calling the API
* Setting up BFF layer for fetching data
* More generic components for bar chart and data table
* Setting up the server for using multiple files
* More test for cover all Scenarios

# How To Run

Prerequisites:

* Install [Nodejs](https://nodejs.org/en/download)
* Run the command `npm install`
* Run the command `npm run test` to run the unit tests
* Run the command `npm run dev` to start the front end
* Run the command `npm run server` to start the server
* Browse to http://localhost:8080