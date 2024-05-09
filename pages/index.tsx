import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import SearchBar from '../components/SearchBar';
import PokemonTypeSelection from '../components/PokemonTypeSelection';

const prisma = new PrismaClient();

const Main: React.FC = () => {
  const [isSearchingbyName, setIsSearchingbyName] = useState<Boolean>(true);


  // const fetchPokemons = async () => {
  //     try {
  //         const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025');
  //         const pokemonData = response.data.results;

  //         for (const pokemon of pokemonData) {
  //             const detailsResponse = await axios.get(pokemon.url);
  //             const details = detailsResponse.data;
  //             // console.log(details)

  //             const types = details.types.map(type => type.type.name); // Extracting type names from the nested structure
  //             const sprites = details.sprites.front_default;

  //             const formBody = { id: details.id, name: details.name, sprite: sprites, types };

  //             console.log(formBody)
  //             // Store the fetched Pokémon data using the API
  //             const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/storepokemon`, {
  //               method: 'POST',
  //               headers: {
  //                   'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify(formBody),
  //           });
  //           const response = await res.json();

  //           if (response.success) {

  //             console.log('Pokemon stored:', details.name);
  //           }
  //         }
  //     } catch (error) {
  //         console.error('Error fetching Pokémon data:', error);
  //     }
  // };

  return (
    <div className='flex flex-col font-ubuntu gap-3 pt-[5vh] items-center justify-center bg_main px-[8vw]'>
      <h1 className='max-md:text-[6vw]  text-[3.5vw] text-center font-bold'>Welcome to the Pokémon Hub</h1>
      <button onClick={() => setIsSearchingbyName(!isSearchingbyName)} className='bg_button1 p-5 rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg max-md:scale-90 hover:shadow-black/60 font-medium duration-200'>Search Pokémon by {isSearchingbyName ? 'Type' : 'Name'}</button>

      {isSearchingbyName ?
        <SearchBar /> :
        <PokemonTypeSelection />
      }

    </div>
  );
};

export default Main;
