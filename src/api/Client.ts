import { ctpClient, withPasswordFlowClient, projectKey } from './ClientBuilder';
import { createApiBuilderFromCtpClient, CustomerDraft } from '@commercetools/platform-sdk';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKey,
});

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

export default {
  queryCustomers,
  createCustomer,
  loginCustomer,
  authCustomerViaEmail,
  queryCustomerById,
  passwordToken,
  emailToken,
};
