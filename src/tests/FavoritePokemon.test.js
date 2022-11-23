import { screen } from '@testing-library/react';
import pokemonList from '../data';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testing Favorite Pokemon component', () => {
  it('checks if the message "No favorite pokémon found" is displayed on the screen if the person does not have a favorite pokémon', () => {
    renderWithRouter(<FavoritePokemon { ...pokemonList } />);

    const notFoundMessage = screen.getByText(/No favorite Pokémon found/);
    expect(notFoundMessage).toBeInTheDocument();
  });
});
