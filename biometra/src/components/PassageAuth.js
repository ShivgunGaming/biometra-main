// PassageAuth.js
import React, { useEffect } from "react";
import '@passageidentity/passage-elements/passage-auth';

function PassageAuth({ appId, onAuthenticate }) {
  useEffect(() => {
    const authElement = document.querySelector("passage-auth");

    if (authElement) {
      authElement.appId = appId;

      authElement.addEventListener("passage-authenticate", (event) => {
        if (onAuthenticate) {
          onAuthenticate(event.detail);
        }
      });
    }
  }, [appId, onAuthenticate]);

  return <passage-auth />;
}

export default PassageAuth;
