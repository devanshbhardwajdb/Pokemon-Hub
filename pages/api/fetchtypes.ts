import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/database';
import Pokemon from '../../models/Pokemon';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const types = await Pokemon.distinct('types');
           
            res.status(200).json({ success: true, data: types });
        } else {
            res.status(400).json({ error: 'This method is not defined' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

export default connectDB(handler);
