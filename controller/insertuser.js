const { MongoClient } = require('mongodb');

const postUserData = async (req, res) => {
    try {
        const uri = "mongodb+srv://Harman20:sukh123@cluster0.iqosrv7.mongodb.net/";
        const dbName = 'softechdata';

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
 
        const database = client.db(dbName);
        const studentsCollection = database.collection('students');
        const teachersCollection = database.collection('teachers');
        const usersCollection = database.collection('users');

        const newUserData = req.body;

        const studentExists = await studentsCollection.findOne({ username: newUserData.username });
        const teacherExists = await teachersCollection.findOne({ username: newUserData.username });

        if (studentExists) {
            const result = await usersCollection.insertOne(newUserData);
            console.log(`User data inserted into users collection with _id: ${result.insertedId}`);

            await client.close();
            res.status(201).json({ message: 'User data created successfully in users collection', userData: newUserData });
        } else if (teacherExists) {
            const result = await usersCollection.insertOne(newUserData);
            console.log(`User data inserted into users collection with _id: ${result.insertedId}`);

            await client.close();
            res.status(201).json({ message: 'User data created successfully in users collection', userData: newUserData });
        } else {
            console.log("User not found in students or teachers collection.");
            await client.close();
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error in postUserData:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = postUserData;
