import * as productsActionCreators from './products';
import * as customerActionCreators from './customer';
import * as customersActionCreators from './customers';
import * as userProfileActionCreators from './userProfile';
export default {
  ...customerActionCreators,
  ...customersActionCreators,
  ...productsActionCreators,
  ...userProfileActionCreators,
};
