exports.data = {
  topics: [
    {
      name: 'Math',
      slug: 'math',
      description:
        "Get up to speed on all things Math! Ace those SAT tests and get into the college you've always dreamed of.",
      subTopics: [
        {
          name: 'Algebra',
          slug: 'algebra',
          description: 'A few basic Algebra flashcard sets.',
          numDecks: 2,
        },
        {
          name: 'Geometry',
          slug: 'geometry',
          description: 'Learn Geometry concepts like area and circumference.',
          numDecks: 1,
        },
        {
          name: 'Calculus',
          slug: 'calculus',
          description: 'Calculus is integral to understanding advanced math.',
          numDecks: 0,
        },
      ],
    },
    {
      name: 'Languages',
      slug: 'languages',
      description:
        'Study hard to improve your foreign language skills. Then share what you learn with the world.',
      subTopics: [
        {
          name: 'Spanish',
          slug: 'spanish',
          description: '?Habla Espanol? If not, then start here!',
          numDecks: 1,
        },
        {
          name: 'French',
          slug: 'french',
          description: 'Learn how to speak fluent French.',
          numDecks: 0,
        },
        {
          name: 'Italian',
          slug: 'italian',
          description: 'Italian is the easiest language to learn.',
          numDecks: 1,
        },
      ],
    },
    {
      name: 'Science',
      slug: 'science',
      description: 'Discover exciting things from the deep sea to the moon.',
      subTopics: [
        {
          name: 'Biology',
          slug: 'biology',
          description: 'Learn all about the Biology of living things.',
          numDecks: 1,
        },
        {
          name: 'Chemistry',
          slug: 'chemistry',
          description: 'What makes us tick?',
          numDecks: 0,
        },
        {
          name: 'Physics',
          slug: 'physics',
          description: 'Learn Physics!',
          numDecks: 1,
        },
      ],
    },
    {
      name: 'All The Things',
      slug: 'all-the-things',
      description: 'Interested in Programming, History, or Trivia? Start here!',
      subTopics: [
        {
          name: 'Computer Science',
          slug: 'computer_science',
          description: 'Learn how computers work.',
          numDecks: 1,
        },
        {
          name: 'History',
          slug: 'history',
          description: 'Take a History lesson and learn from past mistakes..',
          numDecks: 1,
        },
        {
          name: 'US State Capitols',
          slug: 'us_state_capitols',
          description: 'Learn all about the US state capitols.',
          numDecks: 0,
        },
      ],
    },
  ],
  decks: [
    {
      name: 'My Basic Math',
      description: 'Basic Math is eiusmod tempor incididunt ut labore magna.',
      cards: [
        {
          term: 'sum',
          definition: 'result of addition',
        },
        {
          term: 'product',
          definition: 'result of multiplication',
        },
        {
          term: 'quotient',
          definition: 'result of division',
        },
        {
          term: 'difference',
          definition: 'result of subtraction',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Algebra',
      },
    },
    {
      name: 'Some Geometry',
      description: 'Some Geometry is eiusmod tempor incididunt labore magna.',
      cards: [
        {
          term: 'radius',
          definition: 'half the diameter.',
        },
        {
          term: 'diameter',
          definition: 'distance across the center of a circle.',
        },
        {
          term: 'area of square',
          definition: 'the square of one side.',
        },
        {
          term: 'area of a triangle',
          definition: 'half the base x height.',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Geometry',
      },
    },
    {
      name: 'Learn You Spanish',
      description: 'Spanish is eiusmod tempor incididunt ut labore et dolore.',
      cards: [],
      meta: {
        topic: 'Languages',
        subTopic: 'Spanish',
      },
    },
    {
      name: 'CSC 101',
      description: 'CSC 101 is eiusmod tempor incididunt ut labore et dolore.',
      cards: [
        {
          term: 'function',
          definition: 'a group of instructions that perform one task.',
        },
        {
          term: 'recursion',
          definition: 'the act of a function calling itself.',
        },
        {
          term: 'database',
          definition: 'a data storage mechanism.',
        },
      ],
      meta: {
        topic: 'All The Things',
        subTopic: 'Computer Science',
      },
    },
    {
      name: 'Biology',
      description: 'Biology is eiusmod tempor incididunt ut labore et dolore.',
      cards: [
        {
          term: 'Organs',
          definition: 'A part of an beings body that has a specific funtion.',
        },
        {
          term: 'Ketosis',
          definition: 'A body state where ketones are used for fuel.',
        },
        {
          term: 'CPR',
          definition: 'Cardio Pulmonary Resusitation',
        },
      ],
      meta: {
        topic: 'Science',
        subTopic: 'Biology',
      },
    },
    {
      name: 'My Algebra',
      description: 'My Algebra is eiusmod tempor incididunt labore et dolore.',
      cards: [
        {
          term: 'A natural number',
          definition: 'Whole numbers starting at 1',
        },
        {
          term: 'The slope of a line.',
          definition: 'rise over run.',
        },
        {
          term: 'y-intercept',
          definition: 'the point at which a line crosses the y-axis.',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Algebra',
      },
    },
    {
      name: '7th Grade Social Studies',
      description: '7th Grade Social Studies is eiusmod tempor incididunt.',
      cards: [],
      meta: {
        topic: 'All The Things',
        subTopic: 'History',
      },
    },
  ],
}
