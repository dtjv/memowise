# Data Model

The following describes the applications database collections.

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
    "explanation": "It is basic math, bro."
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
