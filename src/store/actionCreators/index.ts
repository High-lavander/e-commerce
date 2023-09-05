import * as productDetailActionCreators from '../productDetail';
import * as customerActionCreators from './customer';
import * as customersActionCreators from './customers';
import * as userProfileActionCreators from './userProfile';
export default {
  ...customerActionCreators,
  ...customersActionCreators,
  ...productDetailActionCreators,
  ...userProfileActionCreators,
};
