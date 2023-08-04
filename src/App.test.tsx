import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

test('renders the app component', () => {
    render(<App />);

    expect(screen.getByText('Vite + React')).toBeInTheDocument();

    expect(screen.getByText('count is 0')).toBeInTheDocument();

    fireEvent.click(screen.getByText('count is 0'));

    expect(screen.getByText('count is 1')).toBeInTheDocument();

    expect(screen.getByText('Click on the Vite and React logos to learn more')).toBeInTheDocument();
});