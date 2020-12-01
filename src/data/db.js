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
        description:
          "Get up to speed on all things Math! Ace those SAT tests and get into the college you've always dreamed of.",
      },
      {
        id: "ma30",
        name: "Languages",
        description:
          "Study hard to improve your foreign language skills. Then share what you learn with the world.",
      },
      {
        id: "zza9",
        name: "Science",
        description:
          "Learn about the world around you. Discover exciting things from the deep sea to the moon.",
      },
      {
        id: "3456",
        name: "History",
        description:
          "Learn the history of everything - from our ancient ancestors to what happened last year.",
      },
      {
        id: "poi3",
        name: "Art",
        description:
          "All things art - drawing, painting, photography, digital, watercolor, etc. The world is your canvas!",
      },
      {
        id: "9asd",
        name: "Other",
        description:
          "Learn all the things! Interested in Programming, Sports, Trivia? Then you'll find plenty to learn here.",
      },
    ],
  },
  sets: [
    {
      id: "adfw",
      ownerid: "1xg5",
      name: "My Basic Math",
      description:
        "Eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
      topic: "Math",
      categories: ["Algebra"],
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
      ],
      access: "public",
      linked: ["1xg5"],
    },
    {
      id: "23rf",
      ownerid: "1xg5",
      name: "Learn You Spanish",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
      topic: "Languages",
      categories: ["Spanish"],
      cards: [],
      access: "public",
      linked: ["1xg5", "2opv"],
    },
    {
      id: "qfrd",
      ownerid: "2opv",
      name: "CSC 101",
      description:
        "Eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. Eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
      topic: "Computer Science",
      categories: ["Algorithms", "Data Structures"],
      cards: [],
      access: "public",
      linked: ["1xg5"],
    },
    {
      id: "avl9",
      ownerid: "2opv",
      name: "Biology",
      description:
        "Eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
      topic: "Science",
      categories: ["Biology", "Chemistry"],
      cards: [],
      access: "public",
      linked: ["2opv"],
    },
    {
      id: "90gd",
      ownerid: "2opv",
      name: "My Algebra",
      description:
        "Eiusmod tempor! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do",
      topic: "Math",
      categories: ["Algebra"],
      cards: [],
      access: "public",
      linked: ["2opv"],
    },
    {
      id: "a40b",
      ownerid: "1xg5",
      name: "Make-up",
      description:
        "Eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      topic: "Cosmetics",
      categories: [],
      cards: [],
      access: "private",
      linked: ["1xg5"],
    },
  ],
};
