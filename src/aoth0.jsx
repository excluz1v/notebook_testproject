import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { domain, clientId } from "./base";

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    // для gh-pages
    //redirectUri="https://excluz1v.github.io/notebook_testproject"
    // Для локалхоста
     redirectUri={window.location.origin}
    audience={`https://${domain}/api/v2/`}
    scope="read:current_user update:current_user_metadata"
    useRefreshTokens={true}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
