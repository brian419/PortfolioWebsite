import { connectToDatabase } from '../../database/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { playerName, score } = req.body;

        try {
            const db = await connectToDatabase();
            await db.collection('Scores').insertOne({
                playerName,
                score,
                createdAt: new Date(),
            });
            res.status(200).json({ message: 'Score submitted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to submit score' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

