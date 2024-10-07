const { MongoClient } = require('mongodb');

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb; 
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const db = client.db(); 

    cachedDb = db; // Cache the db instance
    return db;
}

module.exports = {
    connectToDatabase,
};
