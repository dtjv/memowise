import { useRouter } from "next/router";
import util from "util";
import { db } from "../../../data/db";

// the user's dashboard displays all public flashcards sets in a user's
// collection. if the user is logged in, then display private flashcards sets as
// well.
const UserDashboard = ({ flashcardSets }) => {
  const router = useRouter();
  const { userid } = router.query;

  // i've got incremental static regeneration set. so, the server should
  // regenerate this page. perhaps i don't need client side rendering.

  return (
    <div>
      <h1>Dashboard</h1>
      <p>For user: {userid}</p>
      <div>
        {console.log(util.inspect(flashcardSets, { depth: 4, color: true }))}
      </div>
    </div>
  );
};

export default UserDashboard;

export async function getStaticPaths() {
  // set params to an object, with param field names match dynamic folder name
  return {
    paths: db.users.map((user) => ({ params: { userid: user.id } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const flashcardSet = db.users
    .filter((user) => user.id === params.userid)
    .map((user) => user.sets);
  const { everyone, onlyme } = flashcardSet.pop();
  return { props: { flashcardSets: [...everyone, ...onlyme] }, revalidate: 1 };
}
