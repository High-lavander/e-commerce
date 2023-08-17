// import fetch from 'node-fetch';
// import {
//   ClientBuilder,

//   // Import middlewares
//   type AuthMiddlewareOptions, // Required for auth
//   type HttpMiddlewareOptions, // Required for sending HTTP requests
// } from '@commercetools/sdk-client-v2';

// const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
// const scopes = [import.meta.env.VITE_CTP_SCOPES];

// // Configure authMiddlewareOptions
// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: `https://auth.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com`,
//   projectKey: projectKey,
//   credentials: {
//     clientId: import.meta.env.VITE_CTP_CLIENT_ID,
//     clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
//   },
//   scopes,
//   fetch,
// };

// // Configure httpMiddlewareOptions
// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com`,
//   fetch,
// };

// // Export the ClientBuilder
// export const ctpClient = new ClientBuilder()
//   // .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware() // Include middleware for logging
//   .build();

// import fetch from 'node-fetch';
import {
  ClientBuilder,
  Client,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';

// import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const scopes = [import.meta.env.VITE_CTP_SCOPES];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com`,
  projectKey: projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com`,
  fetch,
};

type PasswordAuthMiddlewareOptions = {
  host: string;
  projectKey: string;
  credentials: {
    clientId: string;
    clientSecret: string;
    user: {
      username: string;
      password: string;
    };
  };
  scopes?: Array<string>;
  tokenCache?: TokenCache;
  oauthUri?: string;
  fetch?: unknown;
};

export const withPasswordFlowClient = (email: string, password: string) => {
  const options: PasswordAuthMiddlewareOptions = {
    host: `https://auth.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com`,
    projectKey: projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes,
    fetch,
  };

  const clientWithPassswordFlow = new ClientBuilder().withPasswordFlow(options).build();
  return clientWithPassswordFlow;
};

// Export the ClientBuilder
export const ctpClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

// export const getApiRoot: () => ApiRoot = () => {
//   return createApiBuilderFromCtpClient(ctpClient);
// };
