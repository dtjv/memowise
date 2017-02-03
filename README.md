# Memowise 

A flashcard web application.

## Features

### Responsive UI

Memowise offers a simple and intuitive UI for the desktop or mobile device.

### Study Progress

Each deck studied displays a progress bar to indicate percent of cards studied.

### Import Decks

Write your own flash card in [markdown](https://daringfireball.net/projects/markdown/syntax) and import them into MongoDB via a command line utility.

## Deck Import

### Writing Flash Cards

A deck of flashcards are written in one markdown file. The structure complies to the following format. Text inside `[` and `]` are placeholders for values that you add. All other text are keywords. It's best to view the sample decks in `docs/decks/`.

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

## Credit 

The original team:

- *Product Owner*: Alex Wong
- *Scrum Master*: Matt Vargeson
- *Development Team Members*: Peter Chim, David Valles

This repo is *almost* a complete rewrite of the [original code](https://github.com/wonky-mongoose/wonky-mongoose).

## License

MIT © David Valles

