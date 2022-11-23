import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe.only('Testing About component', () => {
  it('checks if the page contains two paragraphs with information about Pokédex', () => {
    renderWithRouter(<About />);

    const infoPokedex = screen.getByText(/his application simulates a Pokédex/i);
    const infoPokedex2 = screen.getByText(/One can filter Pokémon by type/i);

    expect(infoPokedex).toBeInTheDocument();
    expect(infoPokedex2).toBeInTheDocument();
  });

  it('checks if the page contains the title h2 with the text "About the Pokédex"', () => {
    renderWithRouter(<About />);

    const titlePokekex = screen.getByRole('heading', {
      name: 'About Pokédex',
    }, 'level2');

    expect(titlePokekex).toBeInTheDocument();
  });

  it('checks if the page contains the following image of a Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img', {
      src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });

    expect(img).toHaveAttribute('src');
  });
});
