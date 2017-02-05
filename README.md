# Memowise
[![build status](https://travis-ci.org/dtjv/memowise.svg?branch=master)](https://travis-ci.org/dtjv/memowise)

A flashcard web application.

![memowise home](./docs/media/memowise-home.png)

## Features

### Responsive UI

Memowise offers a simple and intuitive UI for the desktop or mobile device.

![memowise mobile](./docs/media/memowise-mobile.png)

### Study Progress

Each deck studied displays a progress bar to indicate percent of cards studied.

![memowise dashboard](./docs/media/memowise-dashboard.png)

### Flip Cards

Similar to physical cards, each Memowise card displays a prompt on one side and the answer on the reverse.

#### Question
![memowise card front](./docs/media/memowise-card-front.png)

#### Answer
![memowise card back](./docs/media/memowise-card-back.png)

## Deck Import

You can import decks of flashcards using a simple command line utility.

### Usage

```
$ npm run import -- --help

Flashcard Import Tool

Usage:
  deck-import [<options>]

Options:
  --help     Prints usage
  -a         Import all decks (default)
  -f <file>  Import only deck <file>

Examples:
  $ deck-import -a
  $ deck-import -f math.md
```

> The `bin/deck-import` utility is not installed globally. An npm script is provided and flags are passed to that script using `--`.
> By default the utility loads decks on `docs/decks/`.

### Writing Flash Cards

A deck of flashcards are written in one markdown file.

![memowise write deck](./docs/media/memowise-write-deck.png)

The structure complies to the following format. Text inside `[` and `]` are placeholders for values that you add. All other text are keywords. It's best to view the sample decks in `docs/decks/`.

```
  # [ Title ]

  ## Card
  ### Question
  [ write question ]
  ### Answer
  [ write answer ]
  ### Explanation
  [ write an explanation of the answer ]
  ---
  ## Card
  ### Question
  [ write question ]
  ### Answer
  [ write answer ]
  ### Explanation
  [ write an explanation of the answer ]
  ---
```

## Development

### Tech Stack

* MongoDB
* Express
* React
* React Router
* Redux
* Passport
* Mocha/Chai
* [Materialize CSS](http://materializecss.com/)

### Steps to Run Application 

#### Step 1: Install MongoDB via Homebrew

```
$ brew install mongodb
```

#### Step 2: Clone and Install Repo

```
$ git clone https://github.com/dtjv/memowise.git
$ cd memowise/
$ npm install
```

#### Step 3: Configure

Copy `.env.example` to `.env`. Then set all environment variables. An *example* is provided below.

```
NODE_ENV=development
PROTOCOL=http
HOST=localhost
PORT=3000
DB_NAME=wonky
DB_HOST=localhost
DB_PORT=27017
SESSION_SECRET=memowise
```

#### Step 4: Build 

```
$ npm run build 
```

#### Step 5: Start Mongo Server

Open terminal and type:

```
$ mongod
```

#### Step 6: Start Application 

Open another terminal and type: 

```
$ npm start
```

#### Step 7: Study!

Navigate to configured url. Using the example in Step 3, go to **http://localhost:3000**.

### Other Commands

#### Lint

```
$ npm run lint
```

#### Test

```
$ npm test
```

#### Coverage

To see detailed coverage report in HTML.

```
$ npm run coverage
```

## Data Model

### `users` Collection

An example of a `user` entry in the `users` collection.

```js
{
  "_id": ObjectId("113lhq3t8hagg901"),
  "name": "Bob Hope",
  "email": "bob@hope.com",
  "password": "flk3fqT(#U%!aw#351a"
}
```

## `decks` Collection

An example of a `deck` entry in the `decks` collection.

```js
{
  "_id": ObjectId("10d9hw6g6e198h5a"),
  "name": "Math"
}
```

## `cards` Collection

An example of a `card` entry in the `cards` collection.

```js
{
  "_id": ObjectId("1309uhag9q17g22g")
  "deckId": "10d9hw6g6e198h5a",
  "question": {
    "text": "What is 3 + 3?"
  },
  "answer": {
    "text": "6",
    "explanation": "It is simple addition"
  }
}
```

## `plays` Collection

An example of a `play` entry in the `plays` collection.

```js
{
  "_id": ObjectId("143jhqfp9qwkasf8"),
  "deckId": "10d9hw6g6e198h5a",
  "cardId": "1309uhag9q17g22g",
  "userId": "113lhq3t8hagg901",
  "side": "0",
  "rating": "-1" 
}
```

## Application State

We're using [Redux](http://redux.js.org/) to store our application state. Here are the top level state properties.

### `decks`

Holds all decks in the database.

### `deck`

Holds the currently selected deck the user is studying.

### `card`

Holds the current card being studied

### `plays`

Holds the stats of each card studied by each user. A `side` can hold a value of 0 or 1 for displaying the front or back of a card. A `rating` can hold a user's self assessment of how she performed on a studied card (-1 = poor, 0 = ok, 1 = great).

### Sample State

Below is a sample snapshot of what the state looks like.

```json
{
  "decks": [
    { "_id": "123", "name": "Math" },
    { "_id": "246", "name": "JavaScript" }
  ],
  "deck": {
    "_id": "123",
    "name": "Math"
  },
  "card": {
    "_id": "987",
    "deckId": "123",
    "question": {
      "text": "What is 3 + 3"
    },
    "answer": {
      "text": "6",
      "explanation": "It is simple addition"
    },
  },
  "user": {
    "_id": "777",
    "name": "Joe",
    "email": "joe@example.com",
    "password": "hashed$password"
  },
  "play": {
    "side": 0,
    "deckId":"123",
    "cardId": "987",
    "userId": "777",
    "rating": 1
  }
}
```

## Todo

* [ ] Add more tests
* [ ] Deploy
* [ ] Integrate Materialize Sass into build
* [ ] Use [SM-2](https://www.supermemo.com/english/ol/sm2.htm) algorithm for card selection 
* [ ] Improve profile UI

## Credit 

The original team:

- *Product Owner*: Alex Wong
- *Scrum Master*: Matt Vargeson
- *Development Team Members*: Peter Chim, David Valles

This repo is *almost* a complete rewrite of the [original code](https://github.com/wonky-mongoose/wonky-mongoose).

## License

MIT © David Valles

