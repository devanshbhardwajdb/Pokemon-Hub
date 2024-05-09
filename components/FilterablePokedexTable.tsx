import React, { useState } from 'react';
import PokedexTable from './PokedexTable';
import PokemonTypeSelection from './PokemonTypeSelection';

type Pokemon = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

interface FilterablePokedexTableProps {
  allPokemon: Pokemon[];
}

const FilterablePokedexTable: React.FC<FilterablePokedexTableProps> = ({
  allPokemon,
}) => {
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(allPokemon);
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );

  const selectType = (type: string | undefined) => {
    setSelectedType(type);
    if (!type) {
      setFilteredPokemon(allPokemon);
    } else {
      const filtered = allPokemon.filter((pokemon) =>
        pokemon.types.includes(type)
      );
      setFilteredPokemon(filtered);
    }
  };

  return (
    <div>
      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={selectType}
      />
      <PokedexTable pokemonArray={filteredPokemon} />
    </div>
  );
};

export default FilterablePokedexTable;
