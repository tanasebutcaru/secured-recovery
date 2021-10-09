import { render, screen } from '@testing-library/react';
import Encrypt from '../Encrypt';

test('tbd Encrypt test', () => {
  render(<Encrypt />);
  const linkElement = screen.getByText(/tbd/i);
  expect(linkElement).toBeInTheDocument();
});
