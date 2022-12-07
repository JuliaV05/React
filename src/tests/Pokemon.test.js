import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testing Pokemon component', () => {
  it('checks if a card with the informantion of a certain Pokémon is rendered', () => {
    const pokemon = pokemonList[0];
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemon }
      showDetailsLink
      pokemonList
    />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight', {
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      } });
    const pokemonImage = screen.getByRole('img', { name: /sprite/i });

    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
  });

  it('checks if the card for the Pokémon indicated in the Pokédex contains a navigation link to view details for that Pokémon', () => {
    const pokemon = pokemonList[0];
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemon }
      showDetailsLink
      pokemonList
    />);

    const pokemonCard = screen.getByText('More details', {
      src: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    });

    expect(pokemonCard).toBeInTheDocument();
  });

  it('checks that clicking on the Pokémon browse link redirects the application to the Pokémon details page;', () => {
    const pokemon = pokemonList[0];
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemon }
      showDetailsLink
      pokemonList
    />);

    const pokemonCard = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonCard);
    expect(pokemonCard).toHaveAttribute('href', '/pokemon/25');
  });

  it('checks if there is a star icon o favorite Pokémon', () => {
    const pokemon = pokemonList[0];
    renderWithRouter(<Pokemon
      isFavorite
      pokemon={ pokemon }
      showDetailsLink
      pokemonList
    />);

    const pokemonFavorite = screen.getByRole('img', { name: /is marked as favorite/i });

    expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(pokemonFavorite).toBeInTheDocument();
  });
});
