# Todo

**test**...

```
bin/
  deck-import-cli.js
server/
  controllers/
    card.js
    deck.js
    play.js
    user.js <-- complete?
  services/
    card.js
    deck.js <-- complete?
client/
  actions/
    card <-- complete?
    deck <-- complete?
    play <-- complete?
    user <-- ??
  services/
    ErrorService
    UserService
  components/
    <all>
  containers/
    ??
```

**reorg**... by feature. what's a feature in a multi page app? is it a page?

- https://jaysoo.ca/2016/02/28/applying-code-organization-rules-to-concrete-redux-code/
- https://github.com/jaysoo/todomvc-redux-react-typescript
- https://github.com/erikras/ducks-modular-redux

```
src/
  client/

    index.js <-- stays same as app.js

    -- features -- (by page or rather, by route)
    app/
      components/
        Toolbar.js  <-- should rename to Header
        Menubar.js

    splash/
      components/
        Splash.js

    dashboard/
      components/
        Dashboard.js
        Deck.js
        ProgressBar.js
        DeckLastPlayed.js <-- should rename to LastPlayed.js

    signIn/
      components/
        SignIn.js
      actions.js <-- contains action types too
      reducers.js
      index.js <-- manifest (defines public interface)

    signUp/
      components/
        SignUp.js

    profile/
      components/
        Profile.js

    study/
      components/
        Study.js <-- export component + container(default)

```

# Development Notes

## Mongo Commands

```
$ mongo

> show dbs
> use [db]
> show collections
> db.[collection].find({});
> db.drop();
> db.[collection].drop();
> db.[collection].remove({});
```

## Server

```
$ nodemon src/server/server.js
```

## Watch Build

```
$ npm run build -- --watch
```

## Deploy to Heroku

```
# download heroku toolbelt

$ heroku login

$ cd memowise/

# creates a remote pointing to heroku
$ heroku create

# make changes. add, commit and push to origin. then deploy is...
$ git push heroku master

# refer to https://devcenter.heroku.com/categories/command-line for more commands

# i provisioned a db via the heroku app console

# don't forget to set env vars

# this is how i got access to the server to run `npm run import`
$ heroku run bash

```

## Travis

```yml
language:
  - node_js
node_js:
  - "7"
env:
  - CXX=g++-5 HOST=http://localhost PORT=3000 MONGODB_URI=mongodb://localhost:27017/memowise SESSION_SECRET=memowise NODE_ENV=staging
sudo:
  - required
services:
  - mongodb
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - g++-5
  sauce_connect: true
before_install:
  - npm install -g node-gyp
before_script:
  - sleep 15
  - npm start &
script:
  - npm test
  - npm run e2e
after_success:
  - npm run codecov
```

