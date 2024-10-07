const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb; // Ensure returning the database
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const db = client.db(); // Change this line to return the actual database
    cachedClient = client;
    cachedDb = db; // Cache the db instance
    return db;
}

module.exports = {
    connectToDatabase,
};
