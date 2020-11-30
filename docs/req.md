# requirements

- app supports students & providers
  - both can create folders
  - providers create guides
- guides hold folders & sets
- guides can be sold
- folders hold sets
- user can search public list of flashcard sets
- user can learn 2 more ways
  - user can study flashcard set
  - user can test flashcard set
- user can customize study methods
  - app offers multiple choice, write-in, or true/false
- user can create, edit or delete personal flashcard sets
  - user can add 1 image to a card
  - app supports markdown for card content
  - app supports syntax highlighting in card content
  - app provides suggested definitions to terms
- user can make a personal flashcard set private (public by default)
- user can copy a link to any flashcard set
- user can star and review any public flashcard set
- user can import flashcard sets via a csv file
- user can edit their profile

## page details

    /                         static gen

    /users/:id                static gen + incremental

    /browse                   static gen + incremental
    /browse/:topic            static gen + incremental
    /browse/:topic/:category  static gen + incremental

    /sets
    /sets/new
    /sets/:id                 stattc gen + incremental
    /sets/:id/quiz            static gen + client render
    /sets/:id/study           static gen + client render

### `/`

- marketing
- user can choose to browse by topic or topic/category

### `/browse`

- list all topics (and maybe categories as well)

### `/browse/:topic`

- lists all public flashcard sets in topic
- ui provides category links
- if user is logged in, then user can add (link) a set to personal collection

### `/browse/:topic/:category`

- lists all public flashcard sets in topic/category
- ui provides sub-category links
- if user is logged in, then user can add (link) a set to personal collection

### `/sets`

- route to `/browse`

### `/sets/new`

- display a form to create a set and cards

### `/sets/:id`

- allows user to go thru set of cards, forward and backward,
  flipping cards over - in a traditional style of study.

### `/sets/:id/quiz`

- is a test - multiple choice, written and true/false - all at once. only
  the last attempt result, as a percentage correct, is stored.

### `/sets/:id/study`

- is a test, card by card - multiple choice, written and true/false.
  this method uses an algo to present cards. results are saved to be used in
  subsequent study sessions. a user earns a badge each time mastery is achieved
  (3 badges available). each mastery achievement assigns a badge and resets
  study results.

### `/users/:id`

- user can create, update, or remove folders
- user can add sets into 1+ folders
- user can create, customize, edit, or remove a set
  - customize (available for linked sets) will create a new owned set
  - removing...
    - if owned and private, removed from system
    - if owned and public and unlinked, removed from system
    - if owned and public and linked to others, removed unowned only
  - edit available only to owned sets

## quiz details

    make an api call w/ 'id' to get the set of cards.
    make an api call to generate quiz for that set
    if user is logged in, store result of a completed test in their account.

quiz returned in json:

```json
{
  "quizid": "001",
  "quiz": [
    {
      "id": "361",
      "term": "the result of addition",
      "definition": "sum",
      "options": ["quotient", "sum", "difference"]
    },
    {
      "id": "112",
      "term": "the result of division",
      "definition": "quotient",
      "options": ["difference", "quotient", "sum"]
    }
  ]
}
```

Q: store the quiz?
A: NO. store result of last attempt only.

Q: does the quiz record user's answers?
A: NO.

Q: is the quiz always multiple choice?
A: YES. for now.
