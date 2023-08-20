import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Redirect from '../components/Redirect/Redirect';
describe('Testing Router', () => {
  test('Router', () => {
    render(<Redirect />);
    const mainPage = screen.getByTestId('main-link');
    const aboutPage = screen.getByTestId('about-link');
    userEvent.click(aboutPage);
    expect(screen.getByTestId('About')).toBeInTheDocument();
    userEvent.click(mainPage);
    expect(screen.getByTestId('Delicious and Healthy')).toBeInTheDocument();
  });
});
