import { useAuth0 } from "@auth0/auth0-react";

export function Nav() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  console.log(user, "<-- user");

  return (
    <nav>
      <h1>memowise</h1>

      {isAuthenticated ? (
        <div>
          <span
            id="hello"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Hello, {user.name}!
          </span>{" "}
        </div>
      ) : (
        <div>
          <button id="login" onClick={() => loginWithRedirect()}>
            login
          </button>
        </div>
      )}
    </nav>
  );
}
