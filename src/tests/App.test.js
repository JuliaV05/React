import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Checks if the top of the application contains a fixed set of navigation links...', () => {
  it('tests if the first link has the text "Home"', () => {
    const history = createMemoryHistory();

    //   Access
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkEl1 = screen.getByRole('link', {
      name: /home/i,
    });

    // Check
    expect(linkEl1).toBeInTheDocument();
  });

  it('tests if the second link has the text "About"', () => {
    const history = createMemoryHistory();
    //   Access
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkEl2 = screen.getByRole('link', {
      name: /about/i,
    });
    // Check
    expect(linkEl2).toBeInTheDocument();
  });

  it('tests if the third link has the text "Favorite Pokémon"', () => {
    const history = createMemoryHistory();
    //   Access
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkEl3 = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
      // Check
    expect(linkEl3).toBeInTheDocument();
  });
});

describe('Checks that the application is redirected to the right pages', () => {
  it('tests if the application is redirected to the homepage, when clicking on the "Home" link', () => {
    const { history } = renderWithRouter(<App />);
    // Access
    const catchHome = screen.getByRole('link', {
      name: /home/i,
    });

    // Act
    userEvent.click(catchHome);
    const { location: { pathname } } = history;

    // Check
    expect(catchHome).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('tests if the application is redirected to the "About" page, when clicking on the "About" link', () => {
    const { history } = renderWithRouter(<App />);

    // Access
    const catchAbout = screen.getByRole('link', {
      name: /about/i,
    });

    // Act
    userEvent.click(catchAbout);
    const { location: { pathname } } = history;

    // Check
    expect(catchAbout).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  it('tests if the application is redirected to the "Favorite Pokémon" page, when clicking on the "Favorite Pokémon" link', () => {
    const { history } = renderWithRouter(<App />);

    // Access
    const catchFavorites = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    // Act
    userEvent.click(catchFavorites);
    const { location: { pathname } } = history;

    // Check
    expect(catchFavorites).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });

  it('tests if the application is redirected to the "Not Found" page, when entering an unknown URL', () => {
    // Access
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/not found'); });

    const notFoundEl = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundEl).toBeInTheDocument();
  });
});
