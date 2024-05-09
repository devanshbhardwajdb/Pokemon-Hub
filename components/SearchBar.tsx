import React, { useState, useEffect } from 'react';
import { Pokemon, Names } from '../components/type';
import PokedexTable from '../components/PokedexTable';
import PokemonRow from './PokemonRow';

interface SearchBarProps {
    allPokemon: Pokemon[];
    Names: Names[];


}

const SearchBar: React.FC<SearchBarProps> = ({ }) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<Names[]>([]);
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [newPokemon, setNewPokemon] = useState<Pokemon[]>([]);
    const [isSearching, setIsSearching] = useState<Boolean>(true);




    // const [searchByType, setSearchByType] = useState<boolean>(false);
    // const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(allPokemon);


    useEffect(() => {

        const fetchPokemon = async () => {

            const result = await fetch(`/api/allpokemon`);
            const pokemon = await result.json();
            // console.log(pokemon)

            setAllPokemon(pokemon.data);
        }

        fetchPokemon();


    }, [])


    const selectTerm = (name: string) => {
        if (!searchTerm.includes(name)) {
            setSearchTerm([...searchTerm, name]);
            setIsSearching(false);
            setSearchValue('');
        }
    };

    const removeTerm = (name: string) => {
        setSearchTerm(searchTerm.filter(term => term !== name));
    };

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form submission


        for (let i = 0; i < searchTerm.length; i++) {

            console.log("mai call hogya hu")

            const result = await fetch(`/api/allpokemon?name=${searchTerm[i]}`);
            const pokemon = await result.json();
            // console.log(pokemon)



            newPokemon.push(pokemon.data);
        }
        setAllPokemon(newPokemon);
        console.log(allPokemon)
        setNewPokemon([]);
        setSearchValue('')
        setSearchTerm([]);
    };



    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setIsSearching(true);
        setSearchValue(value);
        // setSearchTerm(searchValue.join(,))
        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const result = await fetch(`/api/searchnames?name=${value}`);
            const { data } = await result.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching Pokémon:', error);
        }
    };

    return (
        <div className='flex flex-col font-oswald gap-5 w-full  py-[5vh] items-center'>


            <form onSubmit={handleSearch} className='flex flex-col gap-7 w-1/2 max-md:w-full relative'>
            <h1 className='text-xl font-bold'>Enter and select your desired pokemons.</h1>
                <div className="container border-2 p-4 border-gray-400 bg-white  flex items-center rounded-lg  gap-2">
                    {searchTerm.map((i) => {
                        return (
                            <div className='bg-gray-300 flex items-center justify-center rounded-md py-2 px-3'>
                                <p>{i}</p>
                                <img src="/cross.png" alt="" className='w-5 cursor-pointer ' onClick={()=>{removeTerm(i)}}  />
                            </div>
                        )

                    })

                    }
                    <input
                        type="text"
                        placeholder=""
                        value={searchValue}
                        onChange={handleChange}
                        className=' bottom-0 w-full  p-4 focus:outline-none bg- '
                    />
                </div>
                <button
                    type='submit'
                    className={` rounded-lg px-4 py-2 bg_button `}
                >
                    Search by Name
                </button>
                {isSearching && <div className='absolute top-[70%] bg_button rounded-md'>
                    {searchResults.map((result, index) => (
                        <div key={index} className='px-4  py-2 border-b   border-gray-400 cursor-pointer hover:bg-white/30 hover:rounded-lg' onClick={() => { selectTerm(result.name) }}>
                            {result.name}
                        </div>
                    ))}
                </div>}
            </form>



            {Array.isArray(allPokemon) ? (
                <PokedexTable pokemonArray={allPokemon} />
            ) : (
                <PokemonRow pokemon={allPokemon} />
            )}
        </div>
    );
};

export default SearchBar;
