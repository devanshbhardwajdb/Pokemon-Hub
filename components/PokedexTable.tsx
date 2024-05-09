import React from 'react';
import PokemonRow from '../components/PokemonRow';
import { Pokemon } from '../components/type'; 

interface PokedexTableProps {
  pokemonArray: Pokemon[];
}

const PokedexTable: React.FC<PokedexTableProps> = ({ pokemonArray }) => {
  return (
    <div className='w-full flex flex-wrap gap-4 items-center justify-center px-[3vw] py-[4vh] '>
      {pokemonArray.map((pokemon) => (
        <PokemonRow key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokedexTable;
