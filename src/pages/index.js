import { db } from "../data/db";
import Link from "next/link";
import util from "util";

const Home = () => {
  const userId = "1xg5";
  const sets = db.sets
    .filter((set) => set.access === "public")
    .filter((set) => !set.linked.includes(userId))
    .map((set) => (
      <li key={set.id}>
        <Link href={`/sets/${set.id}`}>{set.name}</Link>
        <br />
        <button onClick={() => handleAddSet(set.id)}>Add</button>
        <br />
      </li>
    ));

  const handleAddSet = (setId) => {
    const user = db.users.find((user) => user.id === userId);
    user.sets.everyone.push(setId);

    const set = db.sets.find((set) => set.id === setId);
    set.linked.push(userId);

    console.log(util.inspect(user, { depth: 4, color: true }));
    console.log(util.inspect(set, { depth: 4, color: true }));
  };

  return (
    <div>
      <h1>Home</h1>
      <ul>{sets}</ul>
    </div>
  );
};

export default Home;
