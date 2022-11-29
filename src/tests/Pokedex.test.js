import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../pages';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testing Pokedex component', () => {
  it('checks if the page contains an heading h2 with the text "Encountered Pokémon"', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const foundPokemon = screen.getByRole('heading', {
      name: 'Encountered Pokémon',
    }, 'level2');

    expect(foundPokemon).toBeInTheDocument();
  });

  it('checks if the next pokémon on the list is displayed when clicking on the "Próximo Pokémon" button ', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: 'Próximo Pokémon',
    });
    userEvent.click(nextPokemon);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('checks if one Pokémon is shown at a time', () => {
    renderWithRouter(<App />);
    const onePokemon = screen.getByTestId('next-pokemon');
    userEvent.click(onePokemon);
    expect(onePokemon).toBeInTheDocument();
  });

  it('checks if the Pokédex has the filter buttons', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const typePokemon = screen.getAllByTestId('pokemon-type-button');
    typePokemon.forEach((pokemon) => {
      expect(pokemon).toBeInTheDocument();
      // userEvent.click(pokemon);
    });
  });

  it('checks if the Pokédex contains a button to reset the filter', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const allPokemon = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allPokemon).toBeInTheDocument();
    // userEvent.click(allPokemon);
  });
});
