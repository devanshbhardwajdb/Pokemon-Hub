import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import PokemonTypeSelection from '../components/PokemonTypeSelection';


const Main: React.FC = () => {
  const [isSearchingbyName, setIsSearchingbyName] = useState<Boolean>(true);

  return (
    <div className='container flex flex-col font-ubuntu gap-3 pt-[5vh] items-center justify-center bg_main px-[8vw]'>
      <h1 className='max-md:text-[5.5vw]  text-[3.5vw] text-center font-bold'>Welcome to the Pokémon Hub</h1>
      <button onClick={() => setIsSearchingbyName(!isSearchingbyName)} className='bg_button1 p-5 rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg max-md:scale-90 hover:shadow-black/60 font-medium duration-200'>Click to Search Pokémon by {isSearchingbyName ? 'Type' : 'Name'}</button>

      {isSearchingbyName ?
        <SearchBar allPokemon={[]} Result={[]} /> :
        <PokemonTypeSelection selectedType={undefined} selectType={() => { }} />
      }

    </div>
  );
};

export default Main;
