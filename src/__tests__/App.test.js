import { render, screen } from '@testing-library/react';
import App from '../App';

test('tbd App test', () => {
  render(<App />);
  const linkElement = screen.getByText(/tbd/i);
  expect(linkElement).toBeInTheDocument();
});
