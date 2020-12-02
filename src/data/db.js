export const db = {
  users: [
    {
      id: "1xg5",
      name: "mary",
      sets: {
        everyone: ["adfw", "23rf", "qfrd"],
        onlyme: ["a40b"],
      },
    },
    {
      id: "2opv",
      name: "joey",
      sets: {
        everyone: ["23rf", "avl9", "90gd"],
        onlyme: [],
      },
    },
  ],
  topics: {
    DEFAULT: [
      {
        id: "xx1m",
        name: "Math",
        slug: "math",
        description:
          "Get up to speed on all things Math! Ace those SAT tests and get into the college you've always dreamed of.",
        categories: [
          { id: "abse", name: "Algebra" },
          { id: "erb3", name: "Geometry" },
          { id: "32ad", name: "Calculus" },
        ],
      },
      {
        id: "ma30",
        name: "Languages",
        slug: "languages",
        description:
          "Study hard to improve your foreign language skills. Then share what you learn with the world.",
        categories: [
          { id: "0ag3", name: "Spanish" },
          { id: "309f", name: "French" },
          { id: "2309", name: "Italian" },
        ],
      },
      {
        id: "zza9",
        name: "Science",
        slug: "science",
        description:
          "Learn about the world around you. Discover exciting things from the deep sea to the moon.",
        categories: [
          { id: "1230", name: "Biology" },
          { id: "bmnc", name: "Chemistry" },
          { id: "zcw2", name: "Physics" },
        ],
      },
      {
        id: "9asd",
        name: "Other",
        slug: "other",
        description:
          "Learn all the things! Interested in Programming, History, Trivia? Then you'll find plenty to learn here.",
        categories: [
          { id: "65hl", name: "Computer Science" },
          { id: "0khm", name: "History" },
          { id: "lkp2", name: "US State Capitols" },
        ],
      },
    ],
  },
  sets: [
    {
      id: "adfw",
      ownerid: "1xg5",
      name: "My Basic Math",
      description: "Basic Math is eiusmod tempor incididunt ut labore magna.",
      topic: "xx1m",
      category: "abse",
      cards: [
        {
          id: "56o3",
          term: "sum",
          definition: "result of addition",
        },
        {
          id: "1409",
          term: "product",
          definition: "result of multiplication",
        },
        {
          id: "3245",
          term: "quotient",
          definition: "result of division",
        },
        {
          id: "13hy",
          term: "difference",
          definition: "result of subtraction",
        },
      ],
      access: "public",
      linked: ["1xg5"],
    },
    {
      id: "wqty",
      ownerid: "1xg5",
      name: "Some Geometry",
      description: "Some Geometry is eiusmod tempor incididunt labore magna.",
      topic: "xx1m",
      category: "erb3",
      cards: [
        {
          id: "pp98",
          term: "radius",
          definition: "half the diameter.",
        },
        {
          id: "pp78",
          term: "diameter",
          definition: "distance across the center of a circle.",
        },
        {
          id: "pp68",
          term: "area of square",
          definition: "the square of one side.",
        },
        {
          id: "pp58",
          term: "area of a triangle",
          definition: "half the base x height.",
        },
      ],
      access: "public",
      linked: ["1xg5"],
    },
    {
      id: "23rf",
      ownerid: "1xg5",
      name: "Learn You Spanish",
      description: "Spanish is eiusmod tempor incididunt ut labore et dolore.",
      topic: "ma30",
      category: "0ag3",
      cards: [],
      access: "public",
      linked: ["1xg5", "2opv"],
    },
    {
      id: "qfrd",
      ownerid: "2opv",
      name: "CSC 101",
      description: "CSC 101 is eiusmod tempor incididunt ut labore et dolore.",
      topic: "9asd",
      category: "65hl",
      cards: [],
      access: "public",
      linked: ["1xg5"],
    },
    {
      id: "avl9",
      ownerid: "2opv",
      name: "Biology",
      description: "Biology is eiusmod tempor incididunt ut labore et dolore.",
      topic: "zza9",
      category: "1230",
      cards: [],
      access: "public",
      linked: ["2opv"],
    },
    {
      id: "90gd",
      ownerid: "2opv",
      name: "My Algebra",
      description: "My Algebra is eiusmod tempor incididunt labore et dolore.",
      topic: "xx1m",
      category: "abse",
      cards: [],
      access: "public",
      linked: ["2opv"],
    },
    {
      id: "a40b",
      ownerid: "1xg5",
      name: "7th Grade Social Studies",
      description: "7th Grade Social Studies is eiusmod tempor incididunt.",
      topic: "9asd",
      category: "lkp2",
      cards: [],
      access: "private",
      linked: ["1xg5"],
    },
  ],
};
