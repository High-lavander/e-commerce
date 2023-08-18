import { ctpClient, withPasswordFlowClient } from './BuildClient';
import { createApiBuilderFromCtpClient, CustomerDraft } from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// const getProject = () => {
//   return apiRoot
//     .get()
//     .execute()
//     .then((response) => response)
//     .catch(console.error);
// };
const queryCustomers = () => {
  return apiRoot.customers().get().execute();
};

const queryCustomerById = (customerID: string) => {
  return apiRoot.customers().withId({ ID: customerID }).get().execute();
};

const createCustomer = (data: CustomerDraft) => {
  return apiRoot.customers().post({ body: data }).execute();
};

const loginCustomer = (email: string, password: string) => {
  const withPasswordFlow = withPasswordFlowClient(email, password);
  console.log('withPasswordFlow', withPasswordFlow);

  return apiRoot.login().post({ body: { email, password } }).execute();
};

const authCustomerViaEmail = (email: string) => {
  // apiRoot.me().login().post();
  // apiRoot.me().signup().post()
  return apiRoot.customers().withEmailToken({ emailToken: email }).get().execute();
};
const passwordToken = (email: string) => {
  return apiRoot.customers().passwordToken().post({ body: { email } }).execute();
};
const emailToken = (id: string) => {
  return apiRoot
    .customers()
    .emailToken()
    .post({ body: { id, ttlMinutes: 43200 } })
    .execute();
};

//Response
// body :{customer: {…}}
// error:undefined
// statusCode:201

// "customer": {
//   "id": "c57a568c-80c9-4838-beba-aaf45c35c342",
//   "version": 1,
//   "versionModifiedAt": "2023-08-17T07:46:58.047Z",
//   "lastMessageSequenceNumber": 1,
//   "createdAt": "2023-08-17T07:46:58.047Z",
//   "lastModifiedAt": "2023-08-17T07:46:58.047Z",
//   "lastModifiedBy": {
//       "clientId": "svS0pMBqBgsAvo4YHURZIY5j",
//       "isPlatformClient": false
//   },
//   "createdBy": {
//       "clientId": "svS0pMBqBgsAvo4YHURZIY5j",
//       "isPlatformClient": false
//   },
//   "email": "fort2652@ramnler.ru",
//   "firstName": "Anvar",
//   "lastName": "Abduragimov",
//   "password": "****S7g=",
//   "addresses": [],
//   "shippingAddressIds": [],
//   "billingAddressIds": [],
//   "isEmailVerified": false,
//   "stores": [],
//   "authenticationMode": "Password"
// }
// }

//

//ERROR Response

// body: undefined
// error: BadRequest
// body: {statusCode: 400, message: 'There is already an existing customer with the provided email.', errors: Array(1)}
// code: 400
// headers: {content-length: '175', content-type: 'application/json; charset=utf-8', x-correlation-id: 'projects-07f679dc-ad7a-47ee-99f5-dfebc4006d1f'}
// message: "There is already an existing customer with the provided email."
// name: "BadRequest"
// originalRequest: {baseUri: 'https://api.europe-west1.gcp.commercetools.com', method: 'POST', uriTemplate: '/{projectKey}/customers', pathVariables: {…}, headers: {…}, …}
// retryCount: 0
// status: 400
// statusCode: 400
// stack: "BadRequest: There is already an existing customer with the provided email.\n    at createError (http://localhost:5173/node_modules/.vite/deps/@commercetools_sdk-client-v2.js?v=c4c761d0:2556:12)\n    at http://localhost:5173/node_modules/.vite/deps/@commercetools_sdk-client-v2.js?v=c4c761d0:2707:27"
// [[Prototype]]: Error
// statusCode: 400

// Retrieve Project information and output the result to the log

// getProject().then().catch(console.error);

export default {
  queryCustomers,
  createCustomer,
  loginCustomer,
  authCustomerViaEmail,
  queryCustomerById,
  passwordToken,
  emailToken,
};
