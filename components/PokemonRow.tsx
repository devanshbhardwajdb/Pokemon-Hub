import React from 'react';

type Pokemon = {
    id: number;
    name: string;
    types: string[];
    sprite: string;
};

interface PokemonRowProps {
    pokemon: Pokemon;
}

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
    return (
        <div className='pokemoncard bg-gray-400 rounded-xl flex flex-col items-center p-4 w-[20vw] max-md:w-[30vw] justify-center cursor-pointer'>
            <img src={pokemon.sprite} alt={pokemon.name} className='bg-gray-200 w-[100%]' />
            <h1 className='text-[2vw]  font-bold font-ubuntu flex gap-2 items-center'>{pokemon.name} <p className='text-gray-800 font-medium text-[1.8vw]'>#{pokemon.id}</p></h1>
            <div className='flex p-2 text-[1.5vw] gap-2 items-center'>
                <p>Types: </p>
                {pokemon.types.map((type) => {
                    return (
                        <div className='flex bg-gray-600 rounded-md px-2 py-1'>{type}</div>
                    )
                })}
            </div>
        </div>
    );
};

export default PokemonRow;
