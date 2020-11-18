import util from "util";
import { db } from "../../../data/db";

const FlashcardSet = ({ flashcardSet }) => {
  // i've got incremental static regeneration set. so, the server should
  // regenerate this page. perhaps i don't need client side rendering.

  return (
    <div>
      <h1>Flashcard Set</h1>
      {console.log(util.inspect(flashcardSet, { depth: 4, color: true }))}
    </div>
  );
};

export default FlashcardSet;

export async function getStaticPaths() {
  const paths = db.sets.map((set) => ({
    params: { setid: set.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const flashcardSet = db.sets
    .filter((set) => set.id === parseInt(params.setid))
    .pop();
  return {
    props: { flashcardSet },
    revalidate: 1,
  };
}
