#!/usr/bin/env node

/* eslint-disable no-console */

require('dotenv-safe').load();

const meow = require('meow');
const fs = require('fs');
const { join, resolve, basename } = require('path');
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
    .map(fn =>
      ({
        fn: basename(fn),
        content: fs.readFileSync(fn, 'utf8'),
      }))
    .map(parseMarkdownFile)
    .filter(parsedFile => parsedFile);

  importDecks(decks, process.env.MONGODB_URI)
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
