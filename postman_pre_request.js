// ==UserScript==
// @name         Postman Re-Request Script
// @version      0.0.1
// @description  Automatically authenticates with Au auth endpoint before making a request
// @author       Darshan Pandhi
// @prerequisite Postman environment with "hostname", "client_id", and "client_secret" variables
// ==/UserScript==



let tokenUrl = 'https://accounts.{{hostname}}/v1/auth/oidc/token'.replace('{{hostname}}', pm.environment.get('hostname'));
let clientId = pm.environment.get('client_id');
let clientSecret = pm.environment.get('client_secret');

const getTokenRequest = {
  method: 'POST',
  url: tokenUrl,
  header: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: {
      mode: 'urlencoded',
      urlencoded: [
          { key: 'grant_type', value: 'client_credentials' },
          { key: 'client_id', value: clientId },
          { key: 'client_secret', value: clientSecret }
      ]
  }
};

pm.sendRequest(getTokenRequest, (err, response) => {
  const jsonResponse = response.json();
  const newAccessToken = jsonResponse.access_token;

  pm.variables.set('access_token', newAccessToken);
});
