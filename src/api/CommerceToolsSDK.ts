const { createClient } = require('@commercetools/sdk-client');
const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth');
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http');
const { createApiBuilderFromCtpClient } = require('@commercetools/typescript-sdk');

require('dotenv').config();

console.log('Getting started with commercetools Typescript SDK');

const { CTP_CLIENT_ID, CTP_CLIENT_SECRET } = process.env;

const projectKey = 'rs-school-e-commerce-app';

(async () => {
  try {
    const fetch = await import('node-fetch');

    const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey,
      credentials: {
        clientId: CTP_CLIENT_ID,
        clientSecret: CTP_CLIENT_SECRET,
      },
      scopes: ['manage_project:rs-school-e-commerce-app manage_api_clients:rs-school-e-commerce-app'],
      fetch: fetch.default,
    });

    const httpMiddleware = createHttpMiddleware({
      host: 'https://api.europe-west1.gcp.commercetools.com',
      fetch: fetch.default,
    });

    const client = createClient({
      middlewares: [authMiddleware, httpMiddleware],
    });

    const apiRoot = createApiBuilderFromCtpClient(client);

    await apiRoot
      .withProjectKey({ projectKey })
      .get()
      .execute()
      .then((data) => {
        console.log('Project information --->', data);
      })
      .catch((error) => {
        console.log('ERROR --->', error);
      });

    console.log('Got project information');
  } catch (error) {
    console.log('ERROR --->', error);
  }
})();
