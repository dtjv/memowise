import Router from "next/router";
import { Auth0Provider } from "@auth0/auth0-react";

const onRedirectCallback = (appState) => {
  Router.replace(appState?.returnTo || "/");
};

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      scope="read:users"
      redirectUri={typeof window !== "undefined" && window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
