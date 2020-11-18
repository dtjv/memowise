const FlashCardSets = ({ data }) => {
  return (
    <div>
      <h1>All Flashcard Sets</h1>
      {data.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const flashcardSets = [
    {
      id: 1,
      name: "My Basic Algebra",
      category: "Math",
      owner: "dtjv",
      cards: [],
    },
    {
      id: 2,
      name: "Cooking Terms",
      category: "Cooking",
      owner: "dtjv",
      cards: [],
    },
  ];
  return {
    props: {
      data: flashcardSets,
    },
  };
}

export default FlashCardSets;
