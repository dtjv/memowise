# sprints

## mvp

1. [ ] user can authenticate via social account
1. [ ] user can browse public flashcard sets
1. [ ] user can browse cards of public flashcard sets
1. [ ] user can add flashcard sets to personal account

### sprint 1

s: 11.16.2020
e: 11.20.2020

1. mon
   - [x] research
   - [x] requirements
   - [x] sprints
1. tue
   - [x] data model
   - [x] page routes
   - [x] render static data
1. wed
   - [x] browse sets
   - [x] browse cards in a set
   - [x] add a set to user account (sorta... no api/persistence)
1. thu
   - [ ] ui design
   - [x] auth
   - [ ] db
1. fri
   - [ ] styles
   - [ ] documentation

### 11.19

i'm really trying to figure out what is better, to design data model and user
flow logic before ui. but i think that approach is almost impossible - since you
don't know what data you need for presentation, nor functionality to support.

so, i feel much of the code i've written is throw away once i get the ui fleshed
out a bit more.

### 11.20

i got auth0 to work; however, i based my solution off the
[nextjs-app example](https://github.com/auth0/auth0-react/tree/master/examples/nextjs-app).
this requires the auth0 app to be an SPA and uses `auth0-react`.

then i found [nextjs-auth0](https://github.com/auth0/nextjs-auth0) lib. this is
still in early development, but i got two examples working. the auth0 app needs
to be setup as a web app!

### sprint 2

s: 11.23.2020
e: 11.27.2020

1. mon
   - [ ] ui: /
   - [ ] ui: /sets/new
1. tue
   - [ ] ui: /sets/
   - [ ] ui: /sets/:setid
1. wed
   - [ ] ui: /sets/:setid/study
   - [ ] ui: /sets/:setid/quiz
1. thu
   - [ ] auth
   - [ ] db
1. fri
   - [ ] study
   - [ ] quiz
