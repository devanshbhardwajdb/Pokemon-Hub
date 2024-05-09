import React, { useState, useEffect } from 'react';
import { Pokemon } from '../components/type';
import PokedexTable from '../components/PokedexTable';
import PokemonRow from './PokemonRow';


interface PokemonTypeSelectionProps {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
}

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
  selectedType,
  selectType,
}) => {
  const [types, setTypes] = useState<string[]>([]);
  const [type, setType] = useState<string>('');
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);


  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const result = await fetch('/api/fetchtypes');
        const { data } = await result.json();
        console.log(data)
        setTypes(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {

    const fetchPokemon = async () => {

      const result = await fetch(`/api/allpokemon`);
      const pokemon = await result.json();
      // console.log(pokemon)

      setAllPokemon(pokemon.data);
    }

    fetchPokemon();


  }, [])

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    // selectType(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission



    const result = await fetch(`/api/searchbytype?type=${type}`);
    const pokemon = await result.json();
    // console.log(pokemon)



    setAllPokemon(pokemon.data);

  };

  return (
    <div className='flex flex-col font-oswald gap-5  w-full py-[5vh] items-center'>
      <form onSubmit={handleSearch} className='flex flex-col w-1/2 gap-2 max-md:w-full'>
        <label htmlFor="type" className='text-xl font-bold '>Select Type:</label>
        
          <select id="type" value={type} onChange={handleTypeChange} className='focus:outline-none border-2 rounded-lg'>
            <option value="" className=' border ' >All</option>
            {types.map((type) => (
              <option key={type} value={type} >
                {type}
              </option>
            ))}
          </select>
        
        <button
          type='submit'
          className={`rounded-lg px-4 py-2 bg_button  `}
        >
          Search by Type
        </button>


      </form>

      {Array.isArray(allPokemon) ? (
        <PokedexTable pokemonArray={allPokemon} />
      ) : (
        <PokemonRow pokemon={allPokemon} />
      )}
    </div>
  );
};

export default PokemonTypeSelection;
