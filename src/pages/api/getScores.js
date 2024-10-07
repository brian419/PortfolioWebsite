const { connectToDatabase } = require('../../database/mongodb');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const db = await connectToDatabase();

        const scores = await db
            .collection('Scores')
            .find({})
            .sort({ score: -1 })
            .limit(10)
            .toArray();

        res.status(200).json(scores);
    } else {
        res.status(405).json({ message: 'Method not allowed '});
    }
};
