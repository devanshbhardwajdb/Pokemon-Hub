// searchnames.ts

import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/database';
import Pokemon from '../../models/Pokemon';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const { name } = req.query;

            if (!name || typeof name !== 'string') {
                return res.status(400).json({ success: false, error: 'Invalid search term' });
            }

            // Search for Pokémon names that start with the provided term
            const pokemonNames = await Pokemon.find({ name: { $regex: new RegExp(`^${name}`, 'i') } }).select('name');

            res.status(200).json({ success: true, data: pokemonNames });
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

export default connectDB(handler);
