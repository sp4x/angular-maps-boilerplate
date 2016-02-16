# angular-maps-boilerplate

Bolierplate of an AngularJs app + Google Maps. It uses elasticsearch as database.

## Requirements

* nodejs >= 0.12

## Setup

1. Clone the repository
2. `cd` into the source directory and run `npm install` and `bower install`

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

## database

The application currently points to a remote database, you can change the config object `esConfig` in `app/script/app.js`.
Based on data and configuration from http://www.elasticsearchtutorial.com/spatial-search-tutorial.html
