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
  "_id": ObjectId("5747c2483af8eea20a739724"),
  "name": "Math"
}
```

### `plays` collection

An example of a `play` entry in the `plays` collection.

```js
{
  "_id": ObjectId("113lhq3t8hagg901"),
  "deckId": ObjectId("10d9hw6g6e198h5a"),
  "cardId": ObjectId("1309uhag9q17g22g"),
  "userId": ObjectId("143jhqfp9qwkasf8"),
  "side": "0",
  "rating": "-1" 
}
```
