const { MongoClient } = require('mongodb');
const { host, user, password } = require('./keys').database;

const url = `mongodb+srv://${user}:${password}@${host}`;

const client = new MongoClient(url);
const db = client.db('gardens-of-ink');
const userCollection = db.collection('user');

(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log('Connected to database');
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(username, updates) {
    if ('_id' in updates) {
        delete updates._id;
    }

    await userCollection.updateOne(
        { username: username },
        { $set: updates }
    );
}

async function getUserList() {
    const users = await userCollection.find(
        {},
        { projection: { username: 1, _id: 0 } }
    ).toArray();

    return users.map(u => u.username);
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    getUserList
};
