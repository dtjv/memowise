#!/usr/bin/env node

/* eslint-disable no-console */

require('dotenv-safe').load();

const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const meow = require('meow');
const fs = require('fs');
const { join, resolve } = require('path');
const { importDecks, parseMarkdownFile } = require('./lib/deck-import');

const help = `
  Usage:
    deck-import [<options>]

  Options:
    --help     Prints usage
    -a         Import all decks (default)
    -f <file>  Import only deck <file>

  Examples:
    $ deck-import -a
    $ deck-import -f math.md
  \n
`;

const makeFileList = (opts = {}) => {
  const basePath = resolve(__dirname, '../docs/decks');
  return opts.f
    ? [join(`${basePath}`, opts.f)]
    : fs.readdirSync(basePath).map(fn => join(`${basePath}`, fn));
};

const main = () => {
  const cli = meow({ help, description: 'Flashcard Import Tool' });
  const markdownFiles = makeFileList(cli.flags);

  const decks = markdownFiles
    .map(fn => fs.readFileSync(fn, 'utf8'))
    .map(parseMarkdownFile);

  importDecks(decks, DB_URL)
    .then((result) => {
      decks.forEach(({ name }, idx) =>
        console.log(`Add deck "${name}" (${result[idx].insertedCount} cards)`));
    })
    .catch(err => console.error(err));
};

/*
 * start here!
 */
main();
