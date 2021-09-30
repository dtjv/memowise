# memowise

A flashcard app running Next.js, Tailwind CSS and MongoDB Atlas.

> This project is for demonstration purposes only.

### [View demo](https://memowise.vercel.app) | [Read the article](https://dtjv.io/lessons-from-building-memowise/)

## Features

- 👉 Navigate flashcard sets by topic and sub-topic
- 👀 View flashcard listing for any set
- ✅ Test your knowledge with a multiple-choice quiz

Signed-in users get access to the following.

- ✏️ Create and manage your own flashcard set
- 🔗 Link/Unlink any flashcard set to your account
- 📓 Study flashcards (based on [SM-2](https://en.wikipedia.org/wiki/SuperMemo) algorithm)

## Technology

- [Next.js](https://nextjs.org/)
- [Next-Auth](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Development

### Prerequisites

- Node >= v14.17.6.
- Yarn v1.22.11 _(optional)_

### Install

First, fork the project to your GitHub account.

```sh
$ git clone https://github.com/[your_github_username]/memowise.git
$ cd memowise
$ yarn # or npm i
```

### Configure

Copy `.env.example` to `.env`. Then, set the values as described below.

#### MongoDB

Memowise uses MongoDB. Provide connection credentials to the following
variables.

- `DB_USER=` - db user name
- `DB_PASS=` - db user's password
- `DB_NAME=` - db name
- `DB_URI=` - the [connection string](https://docs.mongodb.com/manual/reference/connection-string/) to db

#### Next-Auth

- `NEXTAUTH_URL=` - for local dev, use `http://localhost:3000`
- `SECRET=` - any value

#### GitHub

Currently, Memowise only uses GitHub for authentication. Assign GitHub OAuth
credentials to the following variables.

- `GITHUB_ID=`
- `GITHUB_SECRET=`

### Database

- [ ] TODO: write up instructions on querying and seeding db

### Run Application

```sh
# development
$ yarn dev

or...

# build & run
$ yarn build
$ yarn start
```

## Author

- [David Valles](https://dtjv.io)

## License

[MIT License](LICENSE)
