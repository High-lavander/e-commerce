import * as productsActionCreators from './products';
import * as customerActionCreators from './customer';
export default {
  ...customerActionCreators,
  ...productsActionCreators,
};
