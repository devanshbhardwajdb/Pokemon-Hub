import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/database';
import Pokemon from '../../models/Pokemon';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { id, name, types, sprite } = req.body;

            // Check if a Pokémon with the same ID already exists
            const existingPokemon = await Pokemon.findOne({ id });

            if (existingPokemon) {
                res.status(400).json({ success: false, error: 'A Pokémon with this ID already exists' });
                return;
            }

            // Create a new Pokémon document
            const newPokemon = new Pokemon({
                id,
                name,
                types,
                sprite,
            });

            // Save the new Pokémon document to the database
            await newPokemon.save();

            res.status(201).json({ success: true, data: newPokemon });
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

export default connectDB(handler);
