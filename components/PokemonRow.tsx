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
        <div className='pokemoncard bg-gray-400 rounded-xl flex flex-col items-center p-4 w-[15vw] max-md:w-[90vw] max-lg:w-[30vw] justify-center cursor-pointer hover:scale-95 hover:shadow-lg hover:shadow-orange-400 duration-300'>
            <img src={pokemon.sprite} alt={pokemon.name} className='bg-gray-200 w-[100%]' />
            <h1 className='text-xl  font-bold font-ubuntu flex gap-2 items-center'>{pokemon.name} <p className='text-gray-800 font-medium text-md'>#{pokemon.id}</p></h1>
            <div className='flex p-2 gap-2 items-center'>
                <p className='text-md'>Types: </p>
                {pokemon.types.map((type) => {
                    return (
                        <div className='flex bg-gray-800 text-white font-normal font-ubuntu text-md rounded-md px-2 py-1'>{type}</div>
                    )
                })}
            </div>
        </div>
    );
};

export default PokemonRow;
