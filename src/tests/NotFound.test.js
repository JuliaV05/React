import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testing Not Found component', () => {
  it('checks if the page contains an h2 heading with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByRole('heading', {
      name: 'Page requested not found',
    }, 'level2');

    expect(notFound).toBeInTheDocument();
  });

  it('checks if the page shows the image', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img', {
      src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    });

    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
