# Memowise 

[Memowise](http://memowise.xyz/) is an awesome flash card app!

## Team

- __Product Owner__: Alex Wong
- __Scrum Master__: Matt Vargeson
- __Development Team Members__: Peter Chim, David Valles

## Table of Contents

1. [Getting Started](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Load Sample Data](#load-sample-data)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Getting Started 

### Install Dependencies

From within the root directory:

```sh
npm install
```

### Build
> This builds the production version to `dist/`.

Specify your environment variables for the appropriate scripts in `package.json`.

```sh
$ npm run build
```

### Run

```sh
$ npm run server-prod
```

Open application to the host you specified in `package.json`.


## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Load Sample Data

From within the root directory:

```sh
npm run import math.md
```

Deck file (math.md) MUST be within documentation/decks/ directory

```sh
npm run import:all
```

Import all decks in document/decks/ directory, be careful, it still imports if deck already exists in database.

### Tasks 

#### build

```sh
$ npm run build
```
Builds the entire application to `dist/`. See `package.json` to set environment variables.

#### server-prod

```sh
$ npm run server-prod
```
Starts the server in production mode. See `package.json` to set environment variables. 

#### watch-server

```sh
$ npm run watch-server 
```
Builds and watches server files for changes. Builds to `dev/`.

#### watch-client

```sh
$ npm run watch-client
```
Builds and watches client files for changes. Builds to `dev/`.

#### run server (development)

```sh
$ npm run server-dev
```
Starts the server in development mode (runs from `localhost:3000`).

#### test

```sh
$ npm run test
```
> **Runs unit tests and coverage report. Ensure `mongod` and the application is built and the server is running.**

#### coverage

```sh
$ npm run coverage
```
Opens code coverage report in browser.

## Roadmap

[![Stories in Ready](https://badge.waffle.io/wonky-mongoose/wonky-mongoose.svg?label=ready&title=Ready)](http://waffle.io/wonky-mongoose/wonky-mongoose)

View the project roadmap [here](https://waffle.io/wonky-mongoose/wonky-mongoose)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
