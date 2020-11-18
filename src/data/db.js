export const db = {
  users: [
    {
      id: 1,
      name: "mary",
      sets: {
        everyone: [1, 2, 3],
        onlyme: [100],
      },
    },
    {
      id: 2,
      name: "joey",
      sets: {
        everyone: [2, 4, 5],
        onlyme: [],
      },
    },
  ],
  sets: [
    { id: 1, name: "My Basic Math", category: "Math", cards: [] },
    { id: 2, name: "Cooking Terms", category: "Cooking", cards: [] },
    { id: 3, name: "CSC 101", category: "Computer Science", cards: [] },
    { id: 4, name: "Car Terms", category: "Cars", cards: [] },
    { id: 5, name: "My Algebra", category: "Math", cards: [] },
    { id: 100, name: "Make-up", category: "Cosmetics", cards: [] },
  ],
};
