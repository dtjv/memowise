# Application State Shape

We're using [Redux](http://redux.js.org/) to store our application state. Below is a sample snapshot of what the state looks like.

```json
{
  // holds all decks for current user
  "decks": [
    { "_id": "123", "name": "Math" },
    { "_id": "246", "name": "JavaScript" }
  ],
  // holds the currently selected deck the user is studying
  "deck": {
    "_id": "123",
    "name": "Math"
  },
  // holds the current card being studied
  "card": {
    "_id": "987",
    "deckId": "123",
    "question": {
      "text": "What is 3 + 3"
    },
    "answer": {
      "text": "6",
      "explanation": "It is just basic math, bro."
    },
  },
  // the current user logged in
  "user": {
    "_id": "777",
    "name": "Joe"
  },
  // the stats associated with studying a card 
  "play": {
    "side": "0",    // "0" - show question, "1" - show answer
    "deckId":"123",
    "cardId": "987",
    "userId": "777",
    "rating": "-1"  // "1" - user did poorly, "0" user did ok, "-1" user did great
  }
}
```
​
