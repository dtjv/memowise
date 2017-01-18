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

## API Documentation

##### Public End Points

|Description|Endpoint|
|---|---|
|[Sign-up](#post-apiauthcreate-account)|POST /api/auth/create-account/|
|[Sign-in](#post-apiauthsign-in)|POST /api/auth/sign-in/|
|[Verify User](#get-apiauthverify)|GET /api/auth/verify/|
|[Sign-out User](#get-apiauthsign-out)|GET /api/auth/sign-out|
|[Get all Decks](#get-apidecks)|GET /api/decks/|
|[Get a Card](#post-apicard)|POST /api/card/|
|[Create a Play](#post-apiplay)|POST /api/play/|
|[Get a user's deck progress](#post-apiprogress)|POST /api/progress|

## `POST /api/auth/create-account/`
## `POST /api/auth/sign-in/`
## `GET /api/auth/verify/`
## `GET /api/auth/sign-out`

## `GET /api/decks/`

Fetches all decks in the database

### Example response

```json
[
  {
  "_id": "575462759373c5503b4afcfc",
  "updatedAt": "2016-06-05T17:33:41.390Z",
  "createdAt": "2016-06-05T17:33:41.390Z",
  "name": "Deck 1"
  },
  {
  "_id": "575462759373c5503b4afcfd",
  "updatedAt": "2016-06-05T17:33:41.390Z",
  "createdAt": "2016-06-05T17:33:41.390Z",
  "name": "Deck 2"
  }
]
```

## `POST /api/card/`

Returns the next card to study.

### Example Request

```json
{
  "deckId": "575462759373c5503b4afcfc",
  "userId": "575462759373c5503b4afcfa"
}
```
### Example Response

```json
{
  "_id": "575462759373c5503b4afcfe",
  "deckId": "575462759373c5503b4afcfc",
  "question": {
    "text": "What is 3 + 3"
  },
  "answer": {
    "text": "6",
    "explanation": "Basic addition"
  }
}
```

## `POST /api/play/`

Saves a play.

### Example Request

```json
{
  "userId": "575462759373c5503b4afcfa",
  "deckId": "575462759373c5503b4afcfc",
  "cardId": "575462759373c5503b4afcfe",
  "side": 1,
  "rating": -1
}
```
### Example Response

> This response is not used by the application.

```json
{
  "_id": "575462759373c5503b4afd10",
  "userId": "575462759373c5503b4afcfa",
  "deckId": "575462759373c5503b4afcfc",
  "cardId": "575462759373c5503b4afcfe",
  "side": 1,
  "rating": -1
}```

## `POST /api/progress`

Retrieves the percentage of cards in a deck that have been studied by a user.

### Example Request

```json
{
  "deckId": "575462759373c5503b4afcfc",
}
```

### Example Response

```json
"70%"
```
