# sprints

## mvp

1. [ ] user can authenticate via social account
1. [ ] user can browse public flashcard sets
1. [ ] user can browse cards of public flashcard sets
1. [ ] user can add flashcard sets to personal account

## notes

i got auth0 to work; however, i based my solution off the
[nextjs-app example](https://github.com/auth0/auth0-react/tree/master/examples/nextjs-app).
this requires the auth0 app to be an SPA and uses `auth0-react`.

then i found [nextjs-auth0](https://github.com/auth0/nextjs-auth0) lib. this is
still in early development, but i got two examples working. the auth0 app needs
to be setup as a web app!

## sprint

s: 11.30.2020
e: 12.04.2020

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
