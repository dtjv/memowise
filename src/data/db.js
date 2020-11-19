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
  sets: [
    {
      id: "adfw",
      ownerid: "1xg5",
      name: "My Basic Math",
      category: "Math",
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
      name: "Cooking Terms",
      category: "Cooking",
      cards: [],
      access: "public",
      linked: ["1xg5", "2opv"],
    },
    {
      id: "qfrd",
      ownerid: "2opv",
      name: "CSC 101",
      category: "Computer Science",
      cards: [],
      access: "public",
      linked: ["1xg5"],
    },
    {
      id: "avl9",
      ownerid: "2opv",
      name: "Car Terms",
      category: "Cars",
      cards: [],
      access: "public",
      linked: ["2opv"],
    },
    {
      id: "90gd",
      ownerid: "2opv",
      name: "My Algebra",
      category: "Math",
      cards: [],
      access: "public",
      linked: ["2opv"],
    },
    {
      id: "a40b",
      ownerid: "1xg5",
      name: "Make-up",
      category: "Cosmetics",
      cards: [],
      access: "private",
      linked: ["1xg5"],
    },
  ],
};
