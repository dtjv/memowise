const dummyDecks = [
  { objId: 0,
    created_at: '5:00',
    name: "JS",
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
    name: "Angular",
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
    deckId: 1,
    cardId: 0 
  },
  { objId: 1,
    created_at: '5:02',
    rating: 1,
    deckId: 1,
    cardId: 0 
  },
  { objId: 2,
    created_at: '5:03',
    rating: 1,
    deckId: 1,
    cardId: 1 
  }];


export { dummyDecks, dummyPlays };