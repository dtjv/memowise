# Data Model

### `decks` collection

```js
{
  "name": "Math",
  "cards": [
    {
      "question": {
        "text": "3 + 3"
      },
      "answer": {
        "text": "6",
        "explanation": "maths"
      }
    },
    {
      "question": {
        "text": "3 - 3"
      },
      "answer": {
        "text": "0",
        "explanation": "maths again"
      }
    },
    {
      "question": {
        "text": "3 * 3"
      },
      "answer": {
        "text": "9",
        "explanation": "maths once again"
      }
    },
    {
      "question": {
        "text": "3 / 3"
      },
      "answer": {
        "text": "1",
        "explanation": "maths for the last time"
      }
    }
  ]
}
```

### `plays` collection

```js
// rating constants
const GREAT = -1;
const OKAY = 0;
const BAD = 1;
// deck object
{
  "_id": ObjectId("113lhq3t8hagg901"),
  "deckId": ObjectId("10d9hw6g6e198h5a"),
  "cardId": ObjectId("1309uhag9q17g22g"),
  "rating": OKAY
}
```

### `users` collection

```js
{
  "_id": ObjectId("113lhq3t8hagg901"),
  "name": "Bob Hope",
  "email": "bob@hope.com",
  "password": "flk3fqT(#U%!aw#351a"
}
```
