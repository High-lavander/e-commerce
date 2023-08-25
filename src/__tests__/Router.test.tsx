import { render, screen, fireEvent } from '../test_utils';
import App from '../App';

describe('Testing routing ', () => {
  test('navigation to Main pages', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Home'));
    const mainElement = screen.getByText('Delicious and Healthy');
    expect(mainElement).toBeInTheDocument();

    fireEvent.click(screen.getByText('About Team'));
    const aboutElement = screen.getByText('About');
    expect(aboutElement).toBeInTheDocument();

    fireEvent.click(screen.getByText('Contact'));
    const contactElement = screen.getByText('Contact');
    expect(contactElement).toBeInTheDocument();
  });
});
