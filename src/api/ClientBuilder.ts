// import fetch from 'node-fetch';
import { ClientBuilder, Client, AuthMiddlewareOptions, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';

export const projectKey = 'rs-school-e-commerce-app';
const scopes = ['manage_project:rs-school-e-commerce-app manage_api_clients:rs-school-e-commerce-app'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: 'hvI2XZLbWCzD8ky8lv0D_f_S',
    clientSecret: 'CyHOxh8948uzr8LIvmqZ5q1TKRznjXJU',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const client: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(client);
};
