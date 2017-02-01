# Memowise 

A flashcard web application.

## Features

### Responsive UI

Memowise offers a simple and intuitive UI for the desktop or mobile device.

### Study Progress

Each deck studied displays a progress bar to indicate percent of cards studied.

### Import Decks

Write your own flash card in [markdown](https://daringfireball.net/projects/markdown/syntax) and import them into MongoDB via a command line utility.

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

#### Step 4: Start Mongo Server

Open terminal and type:

```
$ mongod
```

#### Step 5: Start Application 

Open another terminal and type: 

```
$ npm start
```

#### Step 6: Study!

Navigate to configured url. Using the example in Step 3, go to **http://localhost:3000**.


## Credit 

The original team:

- *Product Owner*: Alex Wong
- *Scrum Master*: Matt Vargeson
- *Development Team Members*: Peter Chim, David Valles

This repo is *almost* a complete rewrite of the [original code](https://github.com/wonky-mongoose/wonky-mongoose).

## License

MIT © David Valles

