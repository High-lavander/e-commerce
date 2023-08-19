import { render, fireEvent } from '@testing-library/react';
import Header from '../components/Header/Header';

test('renders Header component', () => {
  const { getByText, getByTestId } = render(<Header />);

  const logoElement = getByText('Organic');
  expect(logoElement).toBeInTheDocument();

  const homeLink = getByText('Home');
  expect(homeLink).toBeInTheDocument();

  const logInLink = getByText('Log In');
  expect(logInLink).toBeInTheDocument();

  const burgerButton = getByTestId('burger-button');
  fireEvent.click(burgerButton);

  const menu = getByTestId('menu');
  expect(menu).toHaveClass('open');
});
