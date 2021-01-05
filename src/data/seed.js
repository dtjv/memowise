exports.data = {
  topics: [
    {
      name: 'Math',
      slug: 'math',
      description:
        'Get up to speed on all things Math! Ace the SAT, nail that final or simply learn for the challenge. No matter the reason - Memowise is your Math partner.',
      subTopics: [
        {
          name: 'Algebra',
          slug: 'algebra',
          description: 'Get up to speed with a solid foundation in Algebra.',
          numDecks: 2,
        },
        {
          name: 'Geometry',
          slug: 'geometry',
          description:
            'Jump into the fun world of Geometry and learn cool concepts and formulas.',
          numDecks: 1,
        },
        {
          name: 'Arithmetic',
          slug: 'arithmetic',
          description: 'Core math concepts.',
          numDecks: 2,
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
          description: '¿Habla Español? If not, then start here!',
          numDecks: 2,
        },
        {
          name: 'English',
          slug: 'english',
          description: 'Learn all the basics of English.',
          numDecks: 1,
        },
      ],
    },
    {
      name: 'Science',
      slug: 'science',
      description:
        'Discover exciting things in science - from the chemical components of a rock to the function of a small intestine.',
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
          description: 'You can find all things Chemistry here.',
          numDecks: 1,
        },
      ],
    },
    {
      name: 'All The Things',
      slug: 'all-the-things',
      description: 'A collection of various interesting subjects.',
      subTopics: [
        {
          name: 'Computer Science',
          slug: 'computer-science',
          description: 'A few programming concepts.',
          numDecks: 1,
        },
        {
          name: 'United States Trivia',
          slug: 'united-states-trivia',
          description: 'Learn a little US trivia.',
          numDecks: 1,
        },
      ],
    },
  ],
  decks: [
    {
      name: 'US State Capitals',
      description: 'A set of cards to learn the US state capitals.',
      cards: [
        { term: 'Montgomery', definition: 'Alabama' },
        { term: 'Juneau', definition: 'Alaska' },
        { term: 'Phoenix', definition: 'Arizona' },
        { term: 'Little Rock', definition: 'Arkansas' },
        { term: 'Sacramento', definition: 'California' },
        { term: 'Denver', definition: 'Colorado' },
        { term: 'Hartford', definition: 'Connecticut' },
        { term: 'Dover', definition: 'Delaware' },
        { term: 'Tallahassee', definition: 'Florida' },
        { term: 'Atlanta', definition: 'Georgia' },
        { term: 'Honolulu', definition: 'Hawaii' },
        { term: 'Boise', definition: 'Idaho' },
        { term: 'Springfield', definition: 'Illinois' },
        { term: 'Indianapolis', definition: 'Indiana' },
        { term: 'Des Moines', definition: 'Iowa' },
        { term: 'Topeka', definition: 'Kansas' },
        { term: 'Frankfort', definition: 'Kentucky' },
        { term: 'Baton Rouge', definition: 'Louisiana' },
        { term: 'Augusta', definition: 'Maine' },
        { term: 'Annapolis', definition: 'Maryland' },
        { term: 'Boston', definition: 'Massachusetts' },
        { term: 'Lansing', definition: 'Michigan' },
        { term: 'Saint Paul', definition: 'Minnesota' },
        { term: 'Jackson', definition: 'Mississippi' },
        { term: 'Jefferson City', definition: 'Missouri' },
        { term: 'Helena', definition: 'Montana' },
        { term: 'Lincoln', definition: 'Nebraska' },
        { term: 'Carson City', definition: 'Nevada' },
        { term: 'Concord', definition: 'New Hampshire' },
        { term: 'Trenton', definition: 'New Jersey' },
        { term: 'Santa Fe', definition: 'New Mexico' },
        { term: 'Albany', definition: 'New York' },
        { term: 'Raleigh', definition: 'North Carolina' },
        { term: 'Bismarck', definition: 'North Dakota' },
        { term: 'Columbus', definition: 'Ohio' },
        { term: 'Oklahoma City', definition: 'Oklahoma' },
        { term: 'Salem', definition: 'Oregon' },
        { term: 'Harrisburg', definition: 'Pennsylvania' },
        { term: 'Providence', definition: 'Rhode Island' },
        { term: 'Columbia', definition: 'South Carolina' },
        { term: 'Pierre', definition: 'South Dakota' },
        { term: 'Nashville', definition: 'Tennessee' },
        { term: 'Austin', definition: 'Texas' },
        { term: 'Salt Lake City', definition: 'Utah' },
        { term: 'Montpelier', definition: 'Vermont' },
        { term: 'Richmond', definition: 'Virginia' },
        { term: 'Olympia', definition: 'Washington' },
        { term: 'Charleston', definition: 'West Virginia' },
        { term: 'Madison', definition: 'Wisconsin' },
        { term: 'Cheyenne', definition: 'Wyoming' },
      ],
      meta: {
        topic: 'All The Things',
        subTopic: 'United States Trivia',
      },
    },
    {
      name: 'Arithmetic 101',
      description: 'The fundamentals math concepts.',
      cards: [
        { term: 'sum', definition: 'result of addition' },
        { term: 'product', definition: 'result of multiplication' },
        { term: 'quotient', definition: 'result of division' },
        { term: 'difference', definition: 'result of subtraction' },
        {
          term: 'a negative number',
          definition:
            'a number less than 0. commonly denoted with a minus sign in front of the number.',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Arithmetic',
      },
    },
    {
      name: 'Arithmetic: The Good Stuff',
      description: 'More core math concepts.',
      cards: [
        {
          term: 'a fraction',
          definition: 'a numerical quantity that is not a whole number.',
        },
        {
          term: 'numerator',
          definition: 'the top number in a fraction',
        },
        {
          term: 'denominator',
          definition: 'the bottom number in a fraction',
        },
        {
          term: 'square root',
          definition:
            'a square root of a number is a value that, when multiplied by itself, gives the number.',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Arithmetic',
      },
    },
    {
      name: 'Beginning Geometry',
      description: 'A quick intro to terms used in Geometry',
      cards: [
        {
          term: 'radius',
          definition:
            'a straight line extending from the center of a circle or sphere to the circumference or surface.',
        },
        {
          term: 'diameter',
          definition:
            'The diameter is the length of the line through the center that touches two points on the edge of the circle.',
        },
        {
          term: 'area of a square',
          definition: 'the length of one side, multiplied by itself.',
        },
        {
          term: 'a right angle',
          definition: 'an angle of 90 degrees.',
        },
        {
          term: 'hypotenuse',
          definition: 'the side opposite of the right angle of a triangle.',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Geometry',
      },
    },
    {
      name: 'Algebra II',
      description: 'Concepts in Algebra II.',
      cards: [
        {
          term: 'linear equation',
          definition:
            'an algebraic equation in which the variable quantity or quantities are raised to the zero or first power.',
        },
        {
          term: 'expression',
          definition:
            'a mathematical phrase that contains variables, functions, numbers, and/or operations. An expression does not contain equal or inequality signs. ',
        },
        {
          term: 'a point',
          definition:
            'a specific location in space that has no discernable length or width.',
        },
        {
          term: 'real numbers',
          definition: 'the set of all rational and irrational numbers.',
        },
        {
          term: 'a set',
          definition:
            'a set is a finite or infinite collection of distinct objects in which order has no significance.',
        },
        {
          term: 'slope',
          definition:
            'the ratio of change in the vertical axis (y-axis) to each unit change in the horizontal axis (x-axis) in the form rise/run or ?y/?x.',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Algebra',
      },
    },
    {
      name: 'Algebra I',
      description: 'A collection of introductory Algebra terms and concepts.',
      cards: [
        {
          term: 'equation',
          definition:
            'a mathematical statement that says two things are equal. the statement will have an equals sign that separates the two things. the equation says: "what is on the left side is equal to what is on the right side".',
        },
        {
          term: 'constant',
          definition: 'a number on its own.',
        },
        {
          term: 'variable',
          definition: 'a symbol for an unknown value. typically a letter.',
        },
        {
          term: 'coefficient',
          definition: 'a number used to multiply a variable.',
        },
        {
          term: 'operator',
          definition: 'a symbol used to show an operation. (i.e. "+", "-")',
        },
        {
          term: 'term',
          definition:
            'a single number or a variable, or numbers and variables multiplied together.',
        },
      ],
      meta: {
        topic: 'Math',
        subTopic: 'Algebra',
      },
    },
    {
      name: 'Learn You Spanish',
      description: 'An introduction to the Spanish language.',
      cards: [
        {
          term: 'de nada',
          definition: 'you are welcome',
        },
        {
          term: 'buenos días',
          definition: 'good morning',
        },
        {
          term: 'gracias',
          definition: 'thanks',
        },
        {
          term: 'buenas noches',
          definition: 'blue',
        },
        {
          term: 'hola',
          definition: 'hello',
        },
      ],
      meta: {
        topic: 'Languages',
        subTopic: 'Spanish',
      },
    },
    {
      name: 'More Spanish',
      description: 'A continuation of Spanish fundamentals.',
      cards: [
        {
          term: 'tener',
          definition: 'to have',
        },
        {
          term: 'ir',
          definition: 'to be',
        },
        {
          term: 'adiós',
          definition: 'good bye',
        },
        {
          term: 'mucho (or mucha)',
          definition: 'much',
        },
        {
          term: 'tomar',
          definition: 'to take',
        },
      ],
      meta: {
        topic: 'Languages',
        subTopic: 'Spanish',
      },
    },
    {
      name: 'English 101',
      description: 'The English language, deconstructed.',
      cards: [
        {
          term: 'noun',
          definition: 'a person, place or thing.',
        },
        {
          term: 'verb',
          definition:
            'a word used to describe an action, state, or occurrence.',
        },
        {
          term: 'adjective',
          definition:
            'a word or phrase naming an attribute, added to or grammatically related to a noun to modify or describe it.',
        },
        {
          term: 'pronoun',
          definition:
            'a word that can function by itself as a noun phrase and that refers either to the participants in the discourse (e.g., I, you ) or to someone or something mentioned elsewhere in the discourse (e.g., she, it, this )',
        },
        {
          term: 'subject',
          definition:
            'the subject of a sentence is the person, place, or thing that is performing the action of the sentence.',
        },
        {
          term: 'predicate',
          definition:
            'the predicate expresses action or being within the sentence. the simple predicate contains the verb and can also contain modifying words, phrases, or clauses.',
        },
      ],
      meta: {
        topic: 'Languages',
        subTopic: 'English',
      },
    },
    {
      name: 'CSC 101',
      description: 'Learn a few introductory terms in computer science.',
      cards: [
        {
          term: 'code',
          definition:
            'programming languages used to create, edit or manage computer programs or applications.',
        },
        {
          term: 'bug',
          definition:
            "a bug is a programming error that causes unexpected glitches or problems for a program's end user",
        },
        {
          term: 'bit',
          definition:
            'a bit is an abbreviation for "binary digit," the smallest piece of information used by a computer. each bit is either a 1 or a 0, which are the binary digits that make up computer language',
        },
        {
          term: 'debug',
          definition:
            "refers to the process of finding and removing errors from a program's source code.",
        },
        {
          term: 'IP address',
          definition:
            'also known as an "IP number" or simply an "IP," this is a numerical code that identifies a specific computer on the internet.',
        },
        {
          term: 'RAM',
          definition:
            'this is an acronym for random-access memory, the place where a computer stores data while it is being used or changed.',
        },
      ],
      meta: {
        topic: 'All The Things',
        subTopic: 'Computer Science',
      },
    },
    {
      name: 'Chemistry',
      description:
        'The branch of science that deals with the identification of the substances of which matter is composed; the investigation of their properties and the ways in which they interact, combine, and change; and the use of these processes to form new substances.',
      cards: [
        {
          term: 'acid',
          definition:
            'a compound which, when dissolved in water, gives a pH of less than 7.0, or donates a hydrogen ion.',
        },
        {
          term: 'base',
          definition:
            'a substance that accepts a proton and has a pH above 7.0. A common example is sodium hydroxide (NaOH)',
        },
        {
          term: 'atom',
          definition:
            'a chemical element in its smallest form, made up of protons and neutrons within the nucleus and electrons circling the nucleus.',
        },
        {
          term: 'atomic mass',
          definition:
            'the mass of an atom, typically expressed in unified atomic mass units and nearly equivalent to the mass number.',
        },
      ],
      meta: {
        topic: 'Science',
        subTopic: 'Chemistry',
      },
    },
    {
      name: 'Biology',
      description:
        'Biology is the study of living organisms, divided into many specialized fields that cover their morphology, physiology, anatomy, behavior, origin, and distribution.',
      cards: [
        {
          term: 'organs',
          definition:
            'an organ is a self-contained group of tissues that performs a specific function in the body',
        },
        {
          term: 'ketone bodies',
          definition:
            'ketone bodies, or simply ketones are substances produced by the liver during gluconeogenesis, a process that creates glucose in times of fasting and starvation.',
        },
        {
          term: 'natural selection',
          definition:
            'natural selection is a pressure that causes groups of organisms to change over time.',
        },
      ],
      meta: {
        topic: 'Science',
        subTopic: 'Biology',
      },
    },
  ],
}
