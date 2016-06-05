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
