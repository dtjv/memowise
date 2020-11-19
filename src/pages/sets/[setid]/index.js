import { useState } from "react";
import { db } from "../../../data/db";

const Card = ({ card }) => {
  const [cardField, setCardField] = useState("term");
  return (
    <div>
      <p>{card[cardField]}</p>
      <button
        onClick={() =>
          setCardField(cardField === "term" ? "definition" : "term")
        }
      >
        Flip
      </button>
    </div>
  );
};

const ViewSet = ({ cardSet }) => {
  const [cardIdx, setCardIdx] = useState(0);
  const { name, cards } = cardSet;

  if (!cards.length) throw new Error("No cards!!");

  return (
    <div>
      <h1>{name}</h1>
      <br />
      <div>
        <Card card={cards[cardIdx]} />
        <div>
          {cardIdx >= 1 && (
            <button onClick={() => setCardIdx(cardIdx - 1)}>Prev</button>
          )}
          {cardIdx < cards.length - 1 && (
            <button onClick={() => setCardIdx(cardIdx + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSet;

export async function getStaticPaths() {
  const paths = db.sets.map((set) => ({
    params: { setid: set.id },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const cardSet = db.sets.filter((set) => set.id === params.setid).pop();
  return {
    props: { cardSet },
    revalidate: 1,
  };
}
