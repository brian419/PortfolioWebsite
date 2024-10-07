const { connectToDatabase } = require('../database/mongodb');

module.exports = async function handler(req, res) {
    if (req.method === 'POST') {
        const { playerName, score } = req.body;

        const db = await connectToDatabase();

        await db.collection('Scores').insertOne({
            playerName,
            score,
            createdAt: new Date(),
        });

        res.status(200).json({ message: 'Score submitted successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
