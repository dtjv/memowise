const dummyDecks = [
  { objId: 0,
    created_at: '5:00',
    name: "Sublime Text Shortcuts",
    cards: [
      {
        question: 'Class constructor using \'this\' keyword',
        answer: {
          text: 'Pseudoclassical',
          explanation: ' '
        }
      },
      {
        question: 'Two diffreent ways to access object properties',
        answer: {
          text: 'Dot notation and bracket notation',
          explanation: ' '
        }
      }
  ]},
  { objId: 1,
    created_at: '5:00',
    name: "Nothing",
    cards: [
      {
        question: 'MVW stands for?',
        answer: {
          text: 'Model View Whatever',
          explanation: 'A framework using models, views, and whatever fitr your needs'
        }
      },
      {
        question: 'Latest version',
        answer: {
          text: '2',
          explanation: ' '
        }
      }]
  }];

const dummyPlays = [
  { objId: 0,
    created_at: '5:01',
    rating: 1,
    deckId: 0,
    cardId: 0 
  },
  { objId: 1,
    created_at: '5:02',
    rating: 1,
    deckId: 0,
    cardId: 1 
  },
  { objId: 2,
    created_at: '5:03',
    rating: 1,
    deckId: 0,
    cardId: 2 
  },
  { objId: 3,
    created_at: '5:01',
    rating: 1,
    deckId: 0,
    cardId: 3 
  },
  { objId: 4,
    created_at: '5:02',
    rating: 1,
    deckId: 0,
    cardId: 4 
  },
  { objId: 5,
    created_at: '5:03',
    rating: 1,
    deckId: 0,
    cardId: 5 
  },
  { objId: 6,
    created_at: '5:01',
    rating: 1,
    deckId: 0,
    cardId: 5 
  },
  { objId: 7,
    created_at: '5:02',
    rating: 1,
    deckId: 0,
    cardId: 5 
  },
  { objId: 8,
    created_at: '5:03',
    rating: 1,
    deckId: 0,
    cardId: 6 
  }  
];

const dummyCards ={ 
  "data": [
    {
      "question": {text: "Undo Action"}, 
      "answer": {text: "Cmd + Z", explanantion: " "},
      deckId: 0,
      cardId: 0
    },
    {
      "question": {text: "Redo Action"}, 
      "answer": {text: "Cmd + Shift + Z"}
      deckId: 0,
      cardId: 1
    },
    {
      "question": {text: "Copy Current Line/Selection"}, 
      "answer": {text: "Cmd + C"}
      deckId: 0,
      cardId: 2
    },
    {
      "question": {text: "Cut Current Line/Selection"}, 
      "answer": {text: "Cmd + X"}
      deckId: 0,
      cardId: 3
    },
    {
      "question": {text: "Paste"}, 
      "answer": {text: "Cmd + V"}
      deckId: 0,
      cardId: 4
    },
    {
      "question": {text: "Paste and Smart Indent"}, 
      "answer": {text: "Cmd + Shift + V"}
      deckId: 0,
      cardId: 5
    },
    {
      "question": {text: "Indent Current Line/Selection"}, 
      "answer": {text: "Cmd + ]"}
      deckId: 0,
      cardId: 6
    },
    {
      "question": {text: "Unindent Current Line/Selection"}, 
      "answer": {text: "Cmd + ["}
      deckId: 0,
      cardId: 7
    },
    {
      "question": {text: "Split Screen in Two"}, 
      "answer": {text: "Cmd + Option + 2"}
      deckId: 0,
      cardId: 8
    }
  ]
};

export { dummyDecks, dummyPlays, dummyCards };
