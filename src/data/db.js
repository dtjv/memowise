export const db = {
  users: [
    {
      userid: "mjane",
      name: "Mary Jane",
      sets: ["adfw", "wqty", "23rf", "qfrd", "a40b"],
    },
    {
      userid: "hgruber",
      name: "Hans Gruber",
      sets: ["23rf", "avl9", "90gd", "qfrd"],
    },
  ],
  topics: [
    {
      id: "xx1m",
      name: "Math",
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
      description:
        "Learn all the things! Interested in Programming, History, Trivia? Then you'll find plenty to learn here.",
      categories: [
        { id: "65hl", name: "Computer Science" },
        { id: "0khm", name: "History" },
        { id: "lkp2", name: "US State Capitols" },
      ],
    },
  ],
  sets: [
    {
      id: "adfw",
      name: "My Basic Math",
      description: "Basic Math is eiusmod tempor incididunt ut labore magna.",
      topicId: "xx1m",
      categoryId: "abse",
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
      linked: ["mjane", "hgruber"],
    },
    {
      id: "wqty",
      name: "Some Geometry",
      description: "Some Geometry is eiusmod tempor incididunt labore magna.",
      topicId: "xx1m",
      categoryId: "erb3",
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
      linked: ["mjane"],
    },
    {
      id: "23rf",
      name: "Learn You Spanish",
      description: "Spanish is eiusmod tempor incididunt ut labore et dolore.",
      topicId: "ma30",
      categoryId: "0ag3",
      cards: [],
      linked: ["mjane", "hgruber"],
    },
    {
      id: "qfrd",
      name: "CSC 101",
      description: "CSC 101 is eiusmod tempor incididunt ut labore et dolore.",
      topicId: "9asd",
      categoryId: "65hl",
      cards: [],
      linked: ["mjane", "hgruber"],
    },
    {
      id: "avl9",
      name: "Biology",
      description: "Biology is eiusmod tempor incididunt ut labore et dolore.",
      topicId: "zza9",
      categoryId: "1230",
      cards: [],
      linked: ["hgruber"],
    },
    {
      id: "90gd",
      name: "My Algebra",
      description: "My Algebra is eiusmod tempor incididunt labore et dolore.",
      topicId: "xx1m",
      categoryId: "abse",
      cards: [],
      linked: ["hgruber"],
    },
    {
      id: "a40b",
      name: "7th Grade Social Studies",
      description: "7th Grade Social Studies is eiusmod tempor incididunt.",
      topicId: "9asd",
      categoryId: "lkp2",
      cards: [],
      linked: ["mjane"],
    },
  ],
};
