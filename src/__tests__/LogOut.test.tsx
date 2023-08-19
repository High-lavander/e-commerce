import { render } from '@testing-library/react';
import Logout from '../components/LogOut/LogOut';

test('Logout component removes access_token and navigates to home page', () => {
  const navigate = jest.fn();
  const removeItemMock = jest.spyOn(Storage.prototype, 'removeItem');
  render(<Logout />);
  expect(removeItemMock).toHaveBeenCalledWith('access_token');
  expect(navigate).toHaveBeenCalledWith('/');
});
