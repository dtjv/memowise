const dummyDecks = [
  { objId: 0,
    created_at: '5:00',
    name: "JS",
    cards: [
      {
        question: 'Who?',
        answer: {
          text: 'Something or other',
          explanation: 'Another thing'
        }
      },
      {
        question: 'What?',
        answer: {
          text: 'Someone or other',
          explanation: 'Another one'
        }
      }
  ]},
  { objId: 1,
    created_at: '5:00',
    name: "Angular",
    cards: [
      {
        question: 'Who?',
        answer: {
          text: 'Something or other',
          explanation: 'Another thing'
        }
      },
      {
        question: 'What?',
        answer: {
          text: 'Someone or other',
          explanation: 'Another one'
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