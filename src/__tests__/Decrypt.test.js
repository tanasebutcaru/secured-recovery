import { render, screen } from '@testing-library/react';
import Decrypt from '../Decrypt';

test('tbd Decrypt test', () => {
  render(<Decrypt />);
  const linkElement = screen.getByText(/tbd/i);
  expect(linkElement).toBeInTheDocument();
});
