import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação...', () => {
  test('testa se o primeiro link possui o texto "Home"', () => {
    const history = createMemoryHistory();

    //   Acessar
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkEl1 = screen.getByRole('link', {
      name: /home/i,
    });

    // Aferir
    expect(linkEl1).toBeInTheDocument();
  });

  test('testa se o segundo link possui o texto "About"', () => {
    const history = createMemoryHistory();
    //   Acessar
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkEl2 = screen.getByRole('link', {
      name: /about/i,
    });
    // Aferir
    expect(linkEl2).toBeInTheDocument();
  });

  test('testa se o terceiro link possui o texto "Favorite Pokémon"', () => {
    const history = createMemoryHistory();
    //   Acessar
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkEl3 = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
      // Aferir
    expect(linkEl3).toBeInTheDocument();
  });
});

describe('Verifica se a aplicação é redirecionada para as páginas certas', () => {
  test('testa se aplicação é redirecionada para a página inicial, ao clicar no link "Home"', () => {
    const { history } = renderWithRouter(<App />);
    // Acessar
    const catchHome = screen.getByRole('link', {
      name: /home/i,
    });

    // Agir
    userEvent.click(catchHome);
    const { location: { pathname } } = history;

    // Aferir
    expect(catchHome).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  test('testa se aplicação é redirecionada para a página de "About" ao clicar no link "About"', () => {
    const { history } = renderWithRouter(<App />);

    // Acessar
    const catchAbout = screen.getByRole('link', {
      name: /about/i,
    });

    // Agir
    userEvent.click(catchAbout);
    const { location: { pathname } } = history;

    // Aferir
    expect(catchAbout).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  test('testa se aplicação é redirecionada para a página de "Pokémon Favoritados" ao clicar no link "Favorite Pokémon"', () => {
    const { history } = renderWithRouter(<App />);

    // Acessar
    const catchFavorites = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    // Agir
    userEvent.click(catchFavorites);
    const { location: { pathname } } = history;

    // Aferir
    expect(catchFavorites).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });

  test('testa se a aplicação é redirecionada para a página "Not Found", ao entrar numa URL desconhecida', () => {
    // Acessar
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/not found'); });

    const notFoundEl = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundEl).toBeInTheDocument();
  });
});
