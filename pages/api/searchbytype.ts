import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/database';
import Pokemon from '../../models/Pokemon';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const { type } = req.query;

            // If type is not provided, return all Pokémon
            if (!type) {
                const allPokemon = await Pokemon.find();
                return res.status(200).json({ success: true, data: allPokemon });
            }
            
            // Fetch Pokémon by type from the database
            const pokemon = await Pokemon.find({ types: type });

            if (!pokemon) {
                return res.status(404).json({ success: false, error: 'Pokémon not found with the provided type' });
            }

            res.status(200).json({ success: true, data: pokemon });
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

export default connectDB(handler);
