// getuser.js

const { MongoClient } = require('mongodb');

const getUser = async (req, res) => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata'; 

        const client = new MongoClient(uri); 

        await client.connect();

        const database = client.db(dbName);
        const usersCollection = database.collection('users');

        const query = req.body;

        const result = await usersCollection.findOne(query);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

        await client.close();
    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = getUser;
